import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { APP_PORT } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters( new HttpExceptionFilter())
  await app.listen(APP_PORT);
}
bootstrap();
