import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { LoanStatus } from '../loan-status.enum';

export type loanDocument = HydratedDocument<Loan>;

@Schema()
export class Loan {
  @Prop({ required: true, unique: true })
  loanId: string;

  @Prop({ required: true })
  customerId: string;

  @Prop({ required: true })
  amount: number;

  @Prop()
  status: LoanStatus;

  @Prop({ required: true })
  duration: number;

  @Prop({ default: () => new Date() })
  date: Date;
}

export const LoanSchema = SchemaFactory.createForClass(Loan);
