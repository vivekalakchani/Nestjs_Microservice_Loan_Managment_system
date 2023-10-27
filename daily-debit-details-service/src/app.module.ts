import { DailydebitModel } from './dailydebit/dailydebit.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.DB_URL || 'mongodb://localhost:27017/loans',
    ),
    DailydebitModel,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
