import { PartialType } from "@nestjs/swagger";
import { CreateExamStudentDto } from "./create-exam-student.dto";

export class UpdateExamStudentDto extends PartialType(CreateExamStudentDto){}
