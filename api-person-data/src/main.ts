import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3005);
  console.log('API rodando em http://localhost:3005');
}
bootstrap();
