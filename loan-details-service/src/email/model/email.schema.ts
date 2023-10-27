import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmailDocument = HydratedDocument<Email>;

@Schema()
export class Email {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  loanId: string;

  @Prop({ required: true })
  customerId: string;

  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  amount: number;

  @Prop()
  status: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ default: () => new Date() })
  date: Date;

  @Prop()
  message: string;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
