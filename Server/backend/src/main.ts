import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';

dotenv.config();


async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(
    AppModule,
    // {httpsOptions}
  );
  app.setGlobalPrefix('api');
  app.enableCors({
    // origin: 'https://192.168.8.112',
    origin: 'http://localhost:3000',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
