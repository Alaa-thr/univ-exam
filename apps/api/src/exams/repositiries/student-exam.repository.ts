import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Equal, LessThanOrEqual, Repository } from "typeorm";
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
        const t = new Date(2000,1,1,today.getHours(),today.getMinutes(),today.getSeconds())
        console.log("t",time)
        const studentExams = await this.find(
            {
                relations:["exam"],
                where:{
                        isDone : false,
                        exam: {
                            date: Equal(new Date()),
                            endHour: LessThanOrEqual(time)
                        }
                },
                select: [
                    "isDone",
                    "exam",
                    "grade"
                ]
            }
        );
        console.log("studentExams before",studentExams)
        console.log("exam date ",studentExams[0].exam.date)
        console.log("today date ",new Date().getTime())
        if(studentExams[0].exam.date < new Date()){
            console.log("enterrr ifff")
        }

        // for(let i = 0; i< studentExams.length; i++){
        //     if(this.checkExamDateHourExpiration(studentExams[i].exam.date, studentExams[i].exam.endHour)){
        //         studentExams[i].isDone = true;
        //         studentExams[i].grade = -1;
        //     }
        // }
        
      // console.log("studentExams after",studentExams)
       
        
    }
    private checkExamDateHourExpiration(examDate: Date, endHour: Date):boolean{
        const today = new Date();
        if(examDate.getDate() < today.getDate()){
            return true;
        }else if((examDate.getDate() == today.getDate()) && (today.getTime() <= endHour.getTime())){
            return true;
        }
        return false;
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

}