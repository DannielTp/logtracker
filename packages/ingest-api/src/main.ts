import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './routes/app/app.module';
import { setupBullBoard } from 'routes/queue/bull-board';
import { AppDataSource } from 'routes/db/data-source';

(async () => {
    await AppDataSource.initialize();
    
    const app = await NestFactory.create(AppModule);
	setupBullBoard(app.getHttpAdapter().getInstance());

    await app.listen(process.env.PORT ?? 4001);
})();
