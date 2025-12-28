import 'dotenv/config'

import { NestFactory } from '@nestjs/core'
import { AppModule } from './routes/app/app.module'
import { AppDataSource } from 'db/data-source'

(async () => {
    await AppDataSource.initialize()

    const app = await NestFactory.create(AppModule)
    await app.listen(process.env.PORT ?? 4001)
})()
