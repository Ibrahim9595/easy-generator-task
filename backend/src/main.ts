import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PREFIX = 'api';
const API_VERSION = process.env.API_VERSION || '1';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(`${PREFIX}/${API_VERSION}`);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Easy Generator API')
    .setDescription('API documentation for Easy Generator')
    .setVersion(API_VERSION)
    .addTag('easy-generator')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${PREFIX}/${API_VERSION}`, app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
