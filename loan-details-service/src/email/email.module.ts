import { CustomerModule } from 'src/customer/customer.module';
import { Email, EmailSchema } from './model/email.schema';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { LoanModule } from 'src/loan/loan.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Email.name, schema: EmailSchema }]),
    LoanModule,
    CustomerModule,
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'your email',
          pass: 'password',
        },
        tls: {
          rejectUnauthorized: true,
        },
      },
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
