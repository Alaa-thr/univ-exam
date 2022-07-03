import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, getConnection, LessThan, LessThanOrEqual, Repository } from "typeorm";
import { IStudentExam } from "../interfaces/student-exam.interface";
import { StudentExamEntity } from "../entities/studentExam.entity";
import { UpdateExamStudentDto } from "exams/dto/update-exam-student.dto";
import {  QueryDto } from "shared";
import { ExamEntity } from "exams/entities/exam.entity";

@Injectable()
@EntityRepository(StudentExamEntity)
export class StudentExamRepository extends Repository<StudentExamEntity>{

    async findAllScheduledExams(studentId: string,query: QueryDto): Promise<IStudentExam[]>{
        return await (await this.findExams(studentId,false,query)).getMany();
    }

    async findAllTakenExams(studentId: string,query: QueryDto): Promise<IStudentExam[]>{
        return await (await this.findExams(studentId,true,query))
        .andWhere("exmStdnt.grade != -1 ")
        .getMany();
    }
    async createStudentVideo(studentId: string,examId: string,updateExamStudentDto: UpdateExamStudentDto):Promise<IStudentExam>{
        try{
            const studentExam: IStudentExam  = await this.findOne({
                where: {
                    exam: examId,
                    student: studentId 
                }
            });
            studentExam.videoPath = updateExamStudentDto.videoPath;
            studentExam.grade = updateExamStudentDto.grade;
            studentExam.isDone = true;
            
            return await this.save(studentExam);
        }catch(error){
            console.log('exam repo error', error)
            throw new InternalServerErrorException("Something went wrong, video cannot be stored.") 
        }  
    }
    async changeExamStatus():Promise<void>{
        const today = new Date();
        const time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
        const date = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
        const studentExams = await this.find(
            {
                relations:["exam"],
                where:[
                    {
                        isDone : false,
                        exam: {
                            date: date,
                            endHour: LessThanOrEqual(time)
                        }
                    },
                    {
                        isDone : false,
                        exam: {
                            date: LessThan(date)
                        }
                    }
                    

                ],
                select: [
                    "isDone",
                    "exam",
                    "grade"
                ]
            }
        );
        const connection = await getConnection();
        for(let i = 0; i< studentExams.length; i++){
            studentExams[i].isDone = true;
            studentExams[i].grade = -1;
            await this.save(studentExams[i]);
            const examRepo = connection.getRepository(ExamEntity);
            const exam = await examRepo.update(studentExams[i].exam.id,{answersArePublished: true,isPublished: true});
        }  
    }
    private async findExams(studentId: string, isDone: boolean,query: QueryDto){
        const { keyword, type } = query;
        try{
            const exams =  await this.createQueryBuilder('exmStdnt')
            .leftJoinAndSelect('exmStdnt.exam', 'exam')
            .leftJoinAndSelect('exam.examType', 'examType')
            .leftJoin("exam.questions","question")
            .where("exmStdnt.student = :id",{id: studentId})
            .andWhere("exmStdnt.isDone = :done", {done: isDone})
            .andWhere("exam.isPublished = :isPublished", {isPublished: true})
            .andWhere(
                keyword
                  ? `LOWER(exam.title) LIKE LOWER('%${keyword}%')`
                  :type
                  ? `examType.type = '${type}'`
                  : '1=1'
            )
            .loadRelationCountAndMap('exam.questoin_count', 'exam.questions');
        
            return exams;
        }catch(error){
            console.log('exam repo error', error)
            throw new InternalServerErrorException("Something went wrong, exams cannot be recoverd.") 
        }
    }

}