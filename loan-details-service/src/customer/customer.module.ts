import { Customer, CustomerSchema } from './model/customer.model';
import { CustomerCounter, CustomerCounterSchema } from './model/counter.schema';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: CustomerCounter.name, schema: CustomerCounterSchema },
    ]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
