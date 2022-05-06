import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { IStudentExam } from "./interfaces/student-exam.interface";
import { StudentExamEntity } from "./entities/studentExam.entity";

@Injectable()
@EntityRepository(StudentExamEntity)
export class ExamsRepository extends Repository<StudentExamEntity>{

    async findAllScheduledExams(studentId: string): Promise<IStudentExam[]>{
        return await this.findExams(studentId,false)
    }

    async findAllTakenExams(studentId: string): Promise<IStudentExam[]>{
        return await this.findExams(studentId,true)
    }

    private async findExams(studentId: string, isDone: boolean): Promise<IStudentExam[]>{
        try{
            return await this.createQueryBuilder("exams_students")
            .leftJoinAndSelect("exams_students.exam","exams")
            .leftJoinAndSelect("exams.questions","questions")
            .where("exams_students.student = :id",{id: studentId})
            .andWhere("exams_students.isDone = :done", {done: isDone})
            .select("COUNT(questions)","qst_count")
            /*.addSelect([
                "exams_students.grade",
                "exams_students.isDone",
                "exams"
            ])*/
         
            .groupBy("exams")
            /*.addGroupBy("exams_students.grade")
            .addGroupBy("exams_students.isDone")*/
            .getRawMany();

        }catch(error){
            console.log('exam repo error', error)
            throw new InternalServerErrorException("Something went wrong, exams cannot be recoverd.") 
        }
    }

}