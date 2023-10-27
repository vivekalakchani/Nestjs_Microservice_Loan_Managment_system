import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { DailyDebitStatus } from '../dailydebit-status.enum';

@Injectable()
export class DailydebitStatusValidation implements PipeTransform {
  readonly allowedStatus = [
    DailyDebitStatus.OPEN,
    DailyDebitStatus.FAILED,
    DailyDebitStatus.FREQUENTLY_FAILED,
    DailyDebitStatus.FREQUENTLY_REJECTED,
    DailyDebitStatus.REJECTED,
    DailyDebitStatus.CLOSED,
  ];

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    return this.allowedStatus.includes(status);
  }
}
