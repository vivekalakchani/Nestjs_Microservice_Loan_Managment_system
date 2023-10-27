import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dailydebit } from './model/dailydebit.schema';
import { DailyDebitStatus } from './dailydebit-status.enum';
import { DailyDebitCounter } from './model/counter.schema';
import { Model } from 'mongoose';
import { UserCreatedEvent } from './create-loan-request';

@Injectable()
export class DailydebitService {
  private logger = new Logger('DailydebitService');
  constructor(
    @InjectModel(DailyDebitCounter.name)
    private readonly counterModel: Model<DailyDebitCounter>,
    @InjectModel(Dailydebit.name) private DailyDebitModel: Model<Dailydebit>,
  ) {}
  async getNextSequence(): Promise<number> {
    const counter = await this.counterModel.findOneAndUpdate(
      { _id: 'transactionId_counter_id' },
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true },
    );
    try {
      this.logger.log('transactionId  was successfully generated');
      return counter.sequenceValue;
    } catch (error) {
      this.logger.error('transactionId was not generated');
    }
  }

  async createDailyDeb(data: UserCreatedEvent): Promise<Dailydebit> {
    if (!data.amount) {
      throw new Error('Data is undefined.'); // Handle this case appropriately.
    }
    const installmentAmount = data.amount / data.duration;
    const repaymentSchedule = [];
    for (let i = 1; i <= data.duration; i++) {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + i);
      const sequenceNumber = await this.getNextSequence();
      const installment = {
        transactionId: `TNO_${sequenceNumber}`, // You might want to generate a unique dailyDebit ID here.
        installmentNumber: i,
        dueDate,
        installmentAmount,
        remainingBalance: data.amount - i * installmentAmount,
        status: DailyDebitStatus.OPEN,
      };

      repaymentSchedule.push(installment);
    }

    const dailyDebit = new this.DailyDebitModel({
      loanId: data.loanId,
      amount: data.amount,
      duration: data.duration,
      trackingNumber: data.trackingNumber,
      repaymentSchedule,
    });

    try {
      this.logger.log('dailydebit record was successfully generated');
      console.log(
        'handlerUserCreated',
        data.loanId,
        data.amount,
        data.duration,
        data.trackingNumber,
      );

      const savedDailyDebit = await dailyDebit.save();
      return savedDailyDebit;
    } catch (error) {
      this.logger.error('dailydebit record was not generated:', error);
      return error;
    }
  }

  async findAllDailyDebit() {
    try {
      this.logger.log('Find all dailydebit details');
      return await this.DailyDebitModel.find();
    } catch (error) {
      this.logger.error('cannot Find all dailydebit details:', error);
      return error;
    }
  }

  async findOneDailyDebitById(loanId: string) {
    try {
      this.logger.log(`${loanId} - dailydebit details`);
      return await this.DailyDebitModel.findOne({ loanId });
    } catch (error) {
      this.logger.error(`cannot Find ${loanId} - dailydebit details`, error);
      return error;
    }
  }

  async updateDailyDebit(
    loanId: string,
    transactionId: string,
    status: DailyDebitStatus,
  ) {
    const query = {
      loanId: loanId,
      'repaymentSchedule.transactionId': transactionId,
    };

    const update = {
      $set: {
        'repaymentSchedule.$.status': status,
      },
    };

    const updatedLoan = await this.DailyDebitModel.findOneAndUpdate(
      query,
      update,
      { new: true },
    );

    if (!updatedLoan) {
      throw new NotFoundException(`Loan with ID ${loanId} not found`);
    }

    return updatedLoan;
  }

  async removeDailyDebit(transactionId: string) {
    try {
      this.logger.log(`Delete ${transactionId} - dailydebit details`);
      return await this.DailyDebitModel.deleteOne({ transactionId });
    } catch (error) {
      this.logger.error(
        `cannot delete ${transactionId} - dailydebit details`,
        error,
      );
      return error;
    }
  }
}
