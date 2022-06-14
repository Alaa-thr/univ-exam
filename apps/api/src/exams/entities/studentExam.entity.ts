
import { IStudentExam } from "exams/interfaces/student-exam.interface";
import { StudentEntity } from "students/entities/student.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, UpdateDateColumn} from "typeorm";
import { ExamEntity } from "./exam.entity";

@Entity('exams_students')
export class StudentExamEntity implements IStudentExam{

    @Column({
        nullable: false,
        default: 0
    })
    grade: number;

    @Column({
        nullable: false,
        default: false
    })
    isDone: boolean;

    @Column({
        nullable: true
    })
    videoPath: string;

    @CreateDateColumn({
        update: false
    })
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(
        () => ExamEntity, 
        exam => exam.studentExams, 
        { 
            primary: true,
            eager: true
        }
    )
    exam: ExamEntity;

    @ManyToOne(
        () => StudentEntity,
        student => student.studentExams, 
        { 
            primary: true,
            eager: true,
        }
    )
    student: StudentEntity;
    
}
