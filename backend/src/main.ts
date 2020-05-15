import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { InternalCommandInvalidSchemaExceptionFilter } from './shared-kernel/write-side/presentation/rest-api/nestjs-exception-filter/internal-command-invalid-schema.exception-filter';

function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('CodersBoard REST API')
    .setDescription('Internal REST API for CodersBoard')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
}

function setupValidationPipe(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupValidationPipe(app);
  setupSwagger(app);
  app.useGlobalFilters(new InternalCommandInvalidSchemaExceptionFilter());
  await app.listen(process.env.CODERSBOARD_SERVER_PORT || 4000);
}

bootstrap();
