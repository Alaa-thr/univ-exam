import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { ExamEntity } from 'exams/entities/exam.entity';
import { IExam } from 'exams/interfaces/exam.interface';
import { getPagination, getPagingData, QueryDto } from 'shared';

@Injectable()
@EntityRepository(ExamEntity)
export class ExamRepository extends Repository<ExamEntity> {

  async findAll(query: QueryDto,teacherId: string) {
    const { keyword, limit, page, order } = query;
    const { take, skip } = getPagination(page, limit);

    let orderField = 'exam.title';
    let orderType: 'ASC' | 'DESC' = 'ASC';

    if (order) {
      orderField = 'exam.' + order.split(' ')[0];
      orderType = order.split(' ')[1] === 'DESC' ? 'DESC' : 'ASC';
    }

    const users = await this.createQueryBuilder('exam')
      .where( keyword? `(LOWER(exam.title) LIKE LOWER('%${keyword}%')`: '1=1')
      .andWhere("exam.teacher = :teacherId",{teacherId: teacherId})
      .leftJoinAndSelect("exam.examType","examType")
      .leftJoinAndSelect("exam.specialityModuleLevel","specialityModuleLevel")
      .leftJoinAndSelect("exam.questions","questions")
      .leftJoinAndSelect("questions.inputType","inputType")
      .leftJoinAndSelect("questions.answers","answers")
      .leftJoinAndSelect("specialityModuleLevel.speciality","speciality")
      .leftJoinAndSelect("specialityModuleLevel.level","level")
      .leftJoinAndSelect("specialityModuleLevel.module","module")
      .orderBy(orderField, orderType)
      .offset(skip)
      .getManyAndCount();

    return getPagingData(users, take, skip);
  }
  findById(id: string) {
    return this.findOne(id, { relations: ['questions', 'questions.answers'] });
  }

  async findTakenExamsById(studentId: string, examId: string): Promise<IExam> {
    try {
      return await this.createQueryBuilder('exm')
        .leftJoinAndSelect('exm.questions', 'qst')
        .leftJoinAndSelect('exm.examType', 'examType')
        .leftJoinAndSelect('qst.answers', 'answr')
        .leftJoinAndSelect('qst.inputType', 'inputType')
        .leftJoin('exm.studentExams', 'studentExams')
        .leftJoinAndSelect('studentExams.student', 'student')
        .where('exm.id = :id', { id: examId })
        .andWhere('exm.isPublished = :isPublished', { isPublished: true })
        .andWhere('studentExams.studentId = :sId', { sId: studentId })
        .addSelect([
          'studentExams.grade',
          'studentExams.videoPath'
        ])
        .getOne();
    } catch (error) {
      console.log('exam repo error', error);
      throw new InternalServerErrorException(
        'Something went wrong, exams cannot be recoverd.'
      );
    }
  }
  async findStudentAnswersById(
    studentId: string,
    examId: string
  ): Promise<IExam> {
    try {
      return await this.createQueryBuilder('exm')
        .leftJoinAndSelect('exm.questions', 'qst')
        .leftJoinAndSelect('qst.answers', 'answr')
        .leftJoin('answr.students', 'student')
        .where('exm.id = :id', { id: examId })
        .andWhere('student.id = :sId', { sId: studentId })
        .getOne();
    } catch (error) {
      console.log('exam repo error', error);
      throw new InternalServerErrorException(
        'Something went wrong, exams cannot be recoverd.'
      );
    }
  }

  async findScheduledExamById(
    studentId: string,
    examId: string
  ): Promise<IExam> {
    try {
      return await this.createQueryBuilder('exm')
        .leftJoinAndSelect('exm.questions', 'qst')
        .leftJoin('qst.answers', 'answr')
        .leftJoinAndSelect('qst.inputType', 'inputType')
        .leftJoinAndSelect('exm.studentExams', 'studentExams')
        .leftJoin('studentExams.student', 'student')
        .loadRelationCountAndMap('exm.questoin_count', 'exm.questions')
        .where('exm.id = :id', { id: examId })
        .andWhere('exm.isPublished = :isPublished', { isPublished: true })
        .andWhere('studentExams.studentId = :sId', { sId: studentId })
        .addSelect([
          'student.firstName',
          'student.id',
          'student.lastName',
          'student.studentNumber',
          'answr.id',
          'answr.title',
        ])
        .getOne();
    } catch (error) {
      console.log('exam repo error', error);
      throw new InternalServerErrorException(
        'Something went wrong, exams cannot be recoverd.'
      );
    }
  }

  async findExamById(examId: string): Promise<IExam> {
    try {
      return await this.createQueryBuilder('exm')
        .leftJoin('exm.questions', 'qst')
        .loadRelationCountAndMap('exam.questoin_count', 'exm.questions')
        .where('exm.id = :id', { id: examId })
        .getOne();
    } catch (error) {
      console.log('exam repo error', error);
      throw new InternalServerErrorException(
        'Something went wrong, exams cannot be recoverd.'
      );
    }
  }
}
