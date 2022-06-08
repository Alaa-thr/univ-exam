import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { ExamEntity } from "exams/entities/exam.entity";
import { IExam } from "exams/interfaces/exam.interface";

@Injectable()
@EntityRepository(ExamEntity)
export class ExamRepository extends Repository<ExamEntity>{

    async findTakenExamsById(studentId: string, examId: string): Promise<IExam>{
        try{
            return await this.createQueryBuilder('exm')
            .leftJoinAndSelect("exm.questions","qst")
            .leftJoinAndSelect("qst.answers","answr")
            .leftJoin('exm.studentExams', 'studentExams')
            .where("exm.id = :id",{id:examId})
            .andWhere("exm.isPublished = :isPublished", {isPublished: true})
            .andWhere("studentExams.studentId = :sId",{sId: studentId})
            .addSelect("studentExams.grade")
            .getOne();

        }catch(error){
            console.log('exam repo error', error)
            throw new InternalServerErrorException("Something went wrong, exams cannot be recoverd.") 
        }
    }
    async findStudentAnswersById(studentId: string, examId: string): Promise<IExam>{
        try{
            return await this.createQueryBuilder('exm')
            .leftJoinAndSelect("exm.questions","qst")
            .leftJoinAndSelect("qst.answers","answr")
            .leftJoin('answr.students', 'student')    
            .where("exm.id = :id",{id:examId})
            .andWhere("student.id = :sId",{sId: studentId})
            .getOne();

        }catch(error){
            console.log('exam repo error', error)
            throw new InternalServerErrorException("Something went wrong, exams cannot be recoverd.") 
        }
    }
    async findScheduledExamById(studentId: string, examId: string): Promise<IExam>{
        try{
            return await this.createQueryBuilder('exm')
            .leftJoinAndSelect("exm.questions","qst")
            .leftJoin("qst.answers","answr")
            .leftJoinAndSelect('exm.studentExams', 'studentExams')
            .leftJoin("studentExams.student","student")
            .loadRelationCountAndMap('exm.questoin_count', 'exm.questions')
            .where("exm.id = :id",{id:examId})
            .andWhere("exm.isPublished = :isPublished", {isPublished: true})
            .andWhere("studentExams.studentId = :sId",{sId: studentId})
            .addSelect([
                "student.firstName",
                "student.id",
                "student.lastName",
                "student.studentNumber",
                "answr.id",
                "answr.title"
            ])
            .getOne();

        }catch(error){
            console.log('exam repo error', error)
            throw new InternalServerErrorException("Something went wrong, exams cannot be recoverd.") 
        }
    }

    async findExamById(examId: string): Promise<IExam>{
        try{
            return await this.createQueryBuilder('exm')
            .leftJoin("exm.questions","qst")
            .loadRelationCountAndMap('exam.questoin_count', 'exm.questions')
            .where("exm.id = :id",{id:examId})
            .getOne();

        }catch(error){
            console.log('exam repo error', error)
            throw new InternalServerErrorException("Something went wrong, exams cannot be recoverd.") 
        }
    }

    
}