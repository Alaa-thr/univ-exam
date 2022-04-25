import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
.setTitle('Cats example')
.setDescription('The cats API description')
.addTag('cats')
.build();
