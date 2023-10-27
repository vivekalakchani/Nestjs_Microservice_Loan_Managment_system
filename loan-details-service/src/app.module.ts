import { Module } from '@nestjs/common';
import { LoanModule } from './loan/loan.module';
import { CustomerModule } from './customer/customer.module';
import { EmailModule } from './email/email.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PdfModule } from './pdf/pdf.module';

@Module({
  imports: [
    LoanModule,
    MongooseModule.forRoot(
      process.env.DB_URL || 'mongodb://localhost:27017/loans',
    ),
    CustomerModule,
    PdfModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
