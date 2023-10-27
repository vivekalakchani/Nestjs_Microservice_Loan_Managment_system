import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class LoanCounter extends Document {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  sequenceValue: number;
}

export const LoanCounterSchema = SchemaFactory.createForClass(LoanCounter);
