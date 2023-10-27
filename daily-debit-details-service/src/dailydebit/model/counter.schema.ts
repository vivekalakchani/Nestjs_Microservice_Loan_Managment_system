import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class DailyDebitCounter extends Document {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true, unique: true })
  sequenceValue: number;
}

export const DailyDebitCounterSchema =
  SchemaFactory.createForClass(DailyDebitCounter);
