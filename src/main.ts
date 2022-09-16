import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // HttpException Filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // class-validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Swagger
  SwaggerModule.setup(
    '/docs',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('NestJS Typeorm Template Swagger')
        .setDescription('Writed by Ksanbal')
        .setVersion('1.0')
        .build(),
    ),
  );

  await app.listen(process.env.PORT);
}
bootstrap();
