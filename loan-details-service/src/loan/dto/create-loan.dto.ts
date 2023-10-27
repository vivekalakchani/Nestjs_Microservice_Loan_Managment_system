import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateLoanDto {
  @IsNotEmpty()
  @ApiProperty()
  amount: number;

  @IsNotEmpty()
  @ApiProperty()
  customerId: string;

  @IsNotEmpty()
  @ApiProperty()
  duration: number;

  @IsNotEmpty()
  @ApiProperty()
  trackingNumber: string;
}
