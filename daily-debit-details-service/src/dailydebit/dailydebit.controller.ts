import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DailydebitService } from './dailydebit.service';
import { DailydebitStatusValidation } from './pipes/ldailydebit-statusValidation';
import { DailyDebitStatus } from './dailydebit-status.enum';
import { EventPattern } from '@nestjs/microservices';
import { UserCreatedEvent } from './create-loan-request';

@Controller('dailydebit')
export class DailydebitController {
  constructor(private readonly DailydebitService: DailydebitService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @EventPattern('loan_created')
  async createDailyDebit(data: UserCreatedEvent) {
    return await this.DailydebitService.createDailyDeb(data);
  }

  @Get()
  async findAllDailyDebit() {
    return await this.DailydebitService.findAllDailyDebit();
  }

  @Get(':loanId')
  async findOneDailyDebitById(@Param('loanId') loanId: string) {
    return await this.DailydebitService.findOneDailyDebitById(loanId);
  }

  @Patch(':loanId/:transactionId/status')
  async updateDailyDebit(
    @Param('loanId') loanId: string,
    @Param('transactionId') transactionId: string,
    @Body('status', DailydebitStatusValidation) status: DailyDebitStatus,
  ) {
    return await this.DailydebitService.updateDailyDebit(
      loanId,
      transactionId,
      status,
    );
  }
  @Delete(':transactionId')
  async removeDailyDebit(@Param('transactionId') transactionId: string) {
    return await this.DailydebitService.removeDailyDebit(transactionId);
  }
}
