import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { LoanStatus } from '../loan-status.enum';

@Injectable()
export class LoanStatusValidation implements PipeTransform {
  readonly allowedStatus = [
    LoanStatus.OPEN,
    LoanStatus.OUTSTANDING,
    LoanStatus.CLOSED,
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
