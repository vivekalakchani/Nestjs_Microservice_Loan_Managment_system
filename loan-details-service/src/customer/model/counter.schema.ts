import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class CustomerCounter extends Document {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  sequenceValue: number;
}

export const CustomerCounterSchema =
  SchemaFactory.createForClass(CustomerCounter);
