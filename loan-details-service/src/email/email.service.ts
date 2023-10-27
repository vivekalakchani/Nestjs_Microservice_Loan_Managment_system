import { CreateEmailDto } from './dto/create-email.dto';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Email } from './model/email.schema';
import { MailerService } from '@nestjs-modules/mailer';
import { Model } from 'mongoose';

@Injectable()
export class EmailService {
  private logger = new Logger('EmailService');

  constructor(
    private readonly mailerService: MailerService,
    @InjectModel(Email.name) private EmailModel: Model<Email>,
  ) {}

  async sendEmail(
    customerData: any,
    loanDetails: any,
    createEmailDto: CreateEmailDto,
  ) {
    const { email, message } = createEmailDto;
    const emailTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
    </head>
    <body style="font-family: Arial, sans-serif;">
    
        <header style="background-color: #0078d4; color: #fff; text-align: center; padding: 20px;">
            <h1>adcLoan Company</h1>
        </header>
    
        <main style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Hello ${customerData.name},</h2>
            <p>
            Your loan details.
            </p>
            <p> Customer ID :- ${customerData.customerId} </p
            <p> Loan ID :- ${loanDetails.loanId} </p>
            <p> Amount:- $ ${loanDetails.amount} </p>
            <p> Duration:- ${loanDetails.duration} Days</p>
            <p> Start Date:- ${new Date(
              loanDetails.date,
            ).toLocaleDateString()}</p>
             <p> Status:- ${loanDetails.status} </p>
             <p> ${message}</p>
        </main>
    
        <footer style="background-color: #f2f2f2; text-align: center; padding: 10px;">
            &copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.
        </footer>
    
    </body>
    </html>
    `;

    try {
      this.mailerService.sendMail({
        to: email,
        from: 'your email',
        subject: 'Loan Details',
        html: emailTemplate,
      });

      this.logger.log('Email  was successfully generated');
    } catch (error) {
      this.logger.error('Email was not generated');
    }
    const EmailHistory = new this.EmailModel({
      email: email || customerData.email,
      loanId: loanDetails.loanId,
      customerId: customerData.customerId,
      customerName: customerData.name,
      amount: loanDetails.amount,
      status: loanDetails.status,
      duration: loanDetails.duration,
      message,
    });

    try {
      await EmailHistory.save();
      this.logger.log('Email data saved to MongoDB');
    } catch (err) {
      this.logger.error('Error saving email data to MongoDB');
    }
  }
  async findOneEmailByCustomerId(customerId: string) {
    try {
      this.logger.log(`${customerId} - customer Email details`);
      return await this.EmailModel.find({ customerId });
    } catch (error) {
      this.logger.error(
        `cannot Find ${customerId} - customer Email details`,
        error,
      );
      return error;
    }
  }

  async findOneEmailByCustomerIdAndLoanId(customerId: string, loanId: string) {
    try {
      this.logger.log(`${customerId} - customer Email details`);
      return await this.EmailModel.find({ customerId, loanId });
    } catch (error) {
      this.logger.error(
        `cannot Find ${customerId} - customer Email details`,
        error,
      );
      return error;
    }
  }
}
