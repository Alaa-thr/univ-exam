import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, getConnection, Repository } from "typeorm";
import { AnswerEntity } from "exams/entities/answer.entity";
import { StudentEntity } from "students/entities/student.entity";
import { IAnswer } from "exams/interfaces/answer.interface";

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
    async findAnswersByExamId(examId: string): Promise<IAnswer[]>{
        try{
            return await this.createQueryBuilder('answr')
            .leftJoin("answr.question","qst")
            .leftJoin("qst.exam","exm")
            .select([
                "answr.id",
                "answr.isCorrect",
                "qst.point"
            ])
            .where("exm.id = :id",{id:examId})
            .getMany();

        }catch(error){
            console.log('answer repo error', error)
            throw new InternalServerErrorException("Something went wrong, answers cannot be recoverd.") 
        }
    }

}