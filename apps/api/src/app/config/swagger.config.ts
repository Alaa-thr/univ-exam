import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
.setTitle('Exams')
.setDescription('The exams API description')
.addTag('exams')
.build();
