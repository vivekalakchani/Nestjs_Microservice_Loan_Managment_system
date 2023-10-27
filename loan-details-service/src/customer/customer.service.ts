import { Customer } from './model/customer.model';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerCounter } from './model/counter.schema';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CustomerService {
  private logger = new Logger('CustomerService');
  constructor(
    @InjectModel(CustomerCounter.name)
    private readonly counterModel: Model<CustomerCounter>,
    @InjectModel(Customer.name) private CustomerModel: Model<Customer>,
  ) {}

  async getNextSequence(): Promise<number> {
    // Find the counter document and increment the sequence number.
    const counter = await this.counterModel.findOneAndUpdate(
      { _id: 'Customer_Counter_id' },
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true },
    );
    try {
      this.logger.log('CustomerId  was successfully generated');
      return counter.sequenceValue;
    } catch (error) {
      this.logger.error('CustomerId was not generated');
    }
  }

  async createCustomer(createCustomerDto: CreateCustomerDto) {
    const { name, email } = createCustomerDto;
    const sequenceNumber = await this.getNextSequence();

    const customer = new this.CustomerModel({
      customerId: `CNO_${sequenceNumber}`, // You might want to generate a unique customer ID here.
      name,
      email,
    });

    try {
      this.logger.log('customer recode was successfully generated');
      const savedCustomer = await customer.save();

      return savedCustomer;
    } catch (error) {
      this.logger.error('customer recode was not generated:', error);
      return error;
    }
  }
  async findAllCustomer() {
    try {
      this.logger.log('Find all Customer details');
      return await this.CustomerModel.find();
    } catch (error) {
      this.logger.error('cannot Find all Customer details:', error);
      return error;
    }
  }

  async findOneCustomer(customerId: string) {
    try {
      this.logger.log(`${customerId} - customer details`);
      return await this.CustomerModel.findOne({ customerId });
    } catch (error) {
      this.logger.error(`cannot Find ${customerId} - customer details`, error);
      return error;
    }
  }

  async removeCustomer(customerId: string) {
    try {
      this.logger.log(`Delete ${customerId} - loan details`);
      return await this.CustomerModel.deleteOne({ customerId });
    } catch (error) {
      this.logger.error(`cannot delete ${customerId} - loan details`, error);
      return error;
    }
  }
}
