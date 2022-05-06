import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, getConnection, Repository } from "typeorm";
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
            return await this.createQueryBuilder('exmStdnt')
            .leftJoinAndSelect('exmStdnt.exam', 'exam')
            .leftJoin("exam.questions","question")
            .where("exmStdnt.student = :id",{id: studentId})
            .andWhere("exmStdnt.isDone = :done", {done: isDone})
            .loadRelationCountAndMap('exam.questoin_count', 'exam.questions')
            .getMany();
        }catch(error){
            console.log('exam repo error', error)
            throw new InternalServerErrorException("Something went wrong, exams cannot be recoverd.") 
        }
    }

}