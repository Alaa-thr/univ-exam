import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { ExamEntity } from "exams/entities/exam.entity";
import { IExam } from "exams/interfaces/exam.interface";

@Injectable()
@EntityRepository(ExamEntity)
export class ExamRepository extends Repository<ExamEntity>{

    async findTakenExamsById(studentId: string, examId: string): Promise<any>{
        try{
            /*
                // TO TAKE THE EXAM
                    select * from exam
                    where exam.id = examId and isPublished = true
                    join questions.examId = exam.id
                    join answers.questionId = questions.id
                
                //TO SEE THE ANSEWRS OF STUDENT
                    select * from exam
                    where exam.id = examId and isPublished = true
                    join questions.examId = exam.id
                    join answers.questionId = questions.id
                    join answers_students_students.answer = answers.id
                    where answers_students_students.student = studentId

            */
            return await this.createQueryBuilder('exm')
            .leftJoinAndSelect("exm.questions","qst")
            .leftJoinAndSelect("qst.answers","answr")
            //.leftJoinAndSelect("answr.students","student")
            .where("exm.id = :id",{id:examId})
            .andWhere("exm.isPublished = :isPublished", {isPublished: true})
            //.andWhere("student.id = :sId",{sId: studentId})
            .getOne();

        }catch(error){
            console.log('exam repo error', error)
            throw new InternalServerErrorException("Something went wrong, exams cannot be recoverd.") 
        }
    }
}