import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CustomerService } from '../customer/customer.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { EmailService } from './email.service';
import { LoanService } from '../loan/loan.service';

@Controller('email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private loanService: LoanService,
    private customerService: CustomerService,
  ) {}

  @Post(':customerId/:loanId')
  async testSendEmail(
    @Param('customerId') customerId: string,
    @Param('loanId') loanId: string,
    @Body() createEmailDto: CreateEmailDto,
  ) {
    const customerData = await this.customerService.findOneCustomer(customerId);
    const loanDetails = await this.loanService.findOneLoanById(loanId);

    const sendEmail = await this.emailService.sendEmail(
      customerData,
      loanDetails,
      createEmailDto,
    );
    return sendEmail;
  }

  @Get(':customerId/:loanId')
  async findOneEmailByCustomerId(
    @Param('customerId') customerId: string,
    @Param('loanId') loanId: string,
  ) {
    return await this.emailService.findOneEmailByCustomerIdAndLoanId(
      customerId,
      loanId,
    );
  }
}
