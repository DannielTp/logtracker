import 'reflect-metadata'

import { NestFactory } from '@nestjs/core'
import { AppModule } from './routes/app/app.module'

(async () => {
  await NestFactory.createApplicationContext(AppModule)
})()
