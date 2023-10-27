import { DailyDebitStatus } from '../dailydebit-status.enum';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DailydebitDocument = HydratedDocument<Dailydebit>;
@Schema()
export class Dailydebit {
  @Prop({ unique: true, required: true }) // Add 'required: true' to ensure it's not null
  loanId: string;

  @Prop({ required: true }) // Add 'required: true' to ensure it's not null
  amount: number;

  @Prop({ required: true }) // Add 'required: true' to ensure it's not null
  duration: number;

  @Prop({ required: true }) // Add 'required: true' to ensure it's not null
  trackingNumber: string;

  @Prop()
  repaymentSchedule: {
    transactionId: string;
    installmentNumber: number;
    dueDate: Date;
    installmentAmount: number;
    remainingBalance: number;
    status: DailyDebitStatus;
  }[];
}
export const DailydebitSchema = SchemaFactory.createForClass(Dailydebit);
