import { CreateLoanDto } from './dto/create-loan.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Loan } from './model/loan.schema';
import { LoanStatus } from './loan-status.enum';
import { LoanCounter } from './model/counter.schema';
import { Model } from 'mongoose';
import { UserCreatedEvent } from './create-loan-request';

@Injectable()
export class LoanService {
  private logger = new Logger('LoanService');
  constructor(
    @InjectModel(LoanCounter.name)
    private readonly counterModel: Model<LoanCounter>,
    @InjectModel(Loan.name) private LoanModel: Model<Loan>,
    @Inject('LOAN') private readonly loanClient: ClientProxy,
  ) {}
  async getNextSequence(): Promise<number> {
    // Find the counter document and increment the sequence number.
    const counter = await this.counterModel.findOneAndUpdate(
      { _id: 'Loan_counter_id' },
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true },
    );
    try {
      this.logger.log('LoanId  was successfully generated');
      return counter.sequenceValue;
    } catch (error) {
      this.logger.error('LoanId was not generated');
    }
  }

  async createLoan(createLoanDto: CreateLoanDto): Promise<Loan> {
    const { customerId, amount, duration, trackingNumber } = createLoanDto;
    const sequenceNumber = await this.getNextSequence();
    // Assuming you have a Mongoose model and schema for 'Loan'
    // Create a new instance of the 'Loan' model
    const loan = new this.LoanModel({
      loanId: `LNO_${sequenceNumber}`, // You might want to generate a unique loan ID here.
      customerId,
      amount,
      status: LoanStatus.OPEN,
      duration,
    });

    try {
      // Assuming 'loan_created' is the event name
      // Save the 'loan' document to the MongoDB database
      this.logger.log('Loan  was successfully generated');
      const savedLoan = await loan.save();

      const userCreatedEvent = new UserCreatedEvent(
        savedLoan.loanId,
        savedLoan.amount,
        savedLoan.duration,
        trackingNumber,
      );

      this.loanClient.emit('loan_created', userCreatedEvent);
      // Return the saved 'loan' document
      return savedLoan;
    } catch (error) {
      // Handle any errors that occur during the save operation.
      this.logger.error('Loan was not generated:', error);
      return error;
    }
  }

  async findLoan(take: number, page: number) {
    const limit = take; // Set the limit to the 'take' value
    const skip = (page - 1) * limit; // Calculate the skip value based on the page number
    try {
      this.logger.log('Find all loan details using pagination');
      const data = await this.LoanModel.find().skip(skip).limit(limit).exec();
      return data;
    } catch (error) {
      this.logger.error('cannot Find all loan details:', error);
      return error;
    }
  }
  async findOneLoanById(loanId: string) {
    try {
      this.logger.log(`${loanId} - loan details`);
      return await this.LoanModel.findOne({ loanId });
    } catch (error) {
      this.logger.error(`cannot Find ${loanId} - loan details`, error);
      return error;
    }
  }

  async updateLoan(loanId: string, status: LoanStatus) {
    const loan = await this.findOneLoanById(loanId);
    loan.status = status;
    await loan.save();

    try {
      this.logger.log(`update ${loanId} - loan details`);
      return loan;
    } catch (error) {
      this.logger.error(`cannot update ${loanId} - loan details`, error);
      return error;
    }
  }

  async removeLoan(loanId: string) {
    try {
      this.logger.log(`Delete ${loanId} - loan details`);
      return await this.LoanModel.deleteOne({ loanId });
    } catch (error) {
      this.logger.error(`cannot delete ${loanId} - loan details`, error);
      return error;
    }
  }
}
