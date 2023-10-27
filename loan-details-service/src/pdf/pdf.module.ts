import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { LoanModule } from 'src/loan/loan.module';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [LoanModule, CustomerModule],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
