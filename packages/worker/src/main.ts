import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './routes/app/app.module';
import { AppDataSource } from './routes/db/data-source';

(async () => {
  await AppDataSource.initialize()
  await NestFactory.createApplicationContext(AppModule)
})()
