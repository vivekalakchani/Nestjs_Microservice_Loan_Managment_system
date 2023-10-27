import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { CustomerService } from '../customer/customer.service';
import { LoanService } from '../loan/loan.service';
import { PdfService } from './pdf.service';
import { Response } from 'express'; // Import Response from express

@Controller('pdf')
export class PdfController {
  constructor(
    private customerService: CustomerService,
    private loanService: LoanService,
    private pdfService: PdfService,
  ) {}

  @Get(':customerId/:loanId')
  async generatePdf(
    @Param('customerId') customerId: string,
    @Param('loanId') loanId: string,
    @Res() res: Response,
  ) {
    try {
      // Fetch customer data from MongoDB
      const customerData =
        await this.customerService.findOneCustomer(customerId);
      const loanDetails = await this.loanService.findOneLoanById(loanId);

      // Generate PDF using the PdfService
      const pdfBuffer = await this.pdfService.generatePdf(
        customerData,
        loanDetails,
      );
      // Send the PDF as a response
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=${customerId}_${loanId}.pdf`,
      );
      res.status(HttpStatus.OK).send(pdfBuffer);
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error generating PDF');
    }
  }
}
