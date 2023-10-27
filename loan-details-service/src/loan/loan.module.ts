import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { Loan, LoanSchema } from './model/loan.schema';
import { LoanCounter, LoanCounterSchema } from './model/counter.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Loan.name, schema: LoanSchema },
      { name: LoanCounter.name, schema: LoanCounterSchema },
    ]),
    ClientsModule.register([
      {
        name: 'LOAN', // Make sure the name matches the token used in LoanService
        transport: Transport.TCP, // You might use a different transport type
        options: {
          port: 3003,
        },
      },
    ]),
  ],
  controllers: [LoanController],
  providers: [LoanService],
  exports: [LoanService],
})
export class LoanModule {}
