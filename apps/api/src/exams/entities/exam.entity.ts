
import { ExamTypeEnum } from "exams/enum/exam-type.enum";
import { StudentEntity } from "students/entities/student.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('exams')
export class ExamEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: false
    })
    title: string;

    @Column()
    date: Date;

    @Column('time')
    startHour: Date;

    @Column('time')
    endHoud: Date;

    @Column({
        default: false
    })
    isPublished: boolean;

    @Column({
        type: 'enum',
        enum: ExamTypeEnum,
        default: ExamTypeEnum.EXAM
    })
    examType: ExamTypeEnum;

    @Column({
        default: false
    })
    answersArePublished: boolean;

    @CreateDateColumn({
        update: false
    })
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToMany(() => StudentEntity)
    @JoinTable()
    students: StudentEntity[];
}
