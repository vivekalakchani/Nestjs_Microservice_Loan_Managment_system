import { Dailydebit, DailydebitSchema } from './model/dailydebit.schema';
import { DailydebitService } from './dailydebit.service';
import { DailydebitController } from './dailydebit.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DailyDebitCounter,
  DailyDebitCounterSchema,
} from './model/counter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Dailydebit.name, schema: DailydebitSchema },
      { name: DailyDebitCounter.name, schema: DailyDebitCounterSchema },
    ]),
  ],
  controllers: [DailydebitController],
  providers: [DailydebitService],
})
export class DailydebitModel {}
