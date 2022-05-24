import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { IStudentExam } from "../interfaces/student-exam.interface";
import { StudentExamEntity } from "../entities/studentExam.entity";
import { UpdateExamStudentDto } from "exams/dto/update-exam-student.dto";

@Injectable()
@EntityRepository(StudentExamEntity)
export class StudentExamRepository extends Repository<StudentExamEntity>{

    async findAllScheduledExams(studentId: string): Promise<IStudentExam[]>{
        return await this.findExams(studentId,false)
    }

    async findAllTakenExams(studentId: string): Promise<IStudentExam[]>{
        return await this.findExams(studentId,true)
    }

    private async findExams(studentId: string, isDone: boolean): Promise<IStudentExam[]>{
        try{
            return await this.createQueryBuilder('exmStdnt')
            .leftJoinAndSelect('exmStdnt.exam', 'exam')
            .leftJoin("exam.questions","question")
            .where("exmStdnt.student = :id",{id: studentId})
            .andWhere("exmStdnt.isDone = :done", {done: isDone})
            .andWhere("exam.isPublished = :isPublished", {isPublished: true})
            .loadRelationCountAndMap('exam.questoin_count', 'exam.questions')
            .getMany();
        }catch(error){
            console.log('exam repo error', error)
            throw new InternalServerErrorException("Something went wrong, exams cannot be recoverd.") 
        }
    }

    async updateStartExam(studentId: string, examId: string, updateExamStudentDto: UpdateExamStudentDto){
        try{
            return await this.createQueryBuilder()
            .update(StudentExamEntity)
            .set(updateExamStudentDto)
            .where("student = :id",{id: studentId})
            .andWhere("exam = :examId", {examId: examId})
            .execute();  
        }catch(error){
            console.log('exam repo error', error)
            throw new InternalServerErrorException("Something went wrong, exams cannot be updated.") 
        }
    }

}