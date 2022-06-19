import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, getConnection, getRepository, Repository } from "typeorm";
import { AnswerEntity } from "exams/entities/answer.entity";
import { StudentEntity } from "students/entities/student.entity";
import { IAnswer } from "exams/interfaces/answer.interface";
import { QuestionEntity } from "exams/entities/question.entity";
import { IQuestion } from "exams/interfaces/question.interface";

@Injectable()
@EntityRepository(AnswerEntity)
export class AnswersRepository extends Repository<AnswerEntity>{

    async createStudentAnswers(studentId: string, ansewrsId: string[]): Promise<any>{
        try{
            const studentRepository = getConnection().getRepository(StudentEntity);
            const student = await studentRepository.findOne({id: studentId});
            for(let i = 0; i < ansewrsId.length; i++ ){
                const answer = await this.findOne({id: ansewrsId[i]});
                answer.students = [student];
                await this.save(answer);
            }

        }catch(error){
            console.log('answers repo error', error)
            throw new InternalServerErrorException("Something went wrong, student answers cannot be saved.") 
        }
    }
    async findAnswersByExamId(examId: string): Promise<IQuestion[]>{
        try{
            return await  getRepository(QuestionEntity).createQueryBuilder('qst')
            .leftJoinAndSelect("qst.answers","answr")
            .leftJoin("qst.exam","exm")
            .addSelect([
                "answr.id",
                "answr.isCorrect",
            ])
            .where("exm.id = :id",{id:examId})
            .getMany();

        }catch(error){
            console.log('answer repo error', error)
            throw new InternalServerErrorException("Something went wrong, answers cannot be recoverd.") 
        }
    }

}