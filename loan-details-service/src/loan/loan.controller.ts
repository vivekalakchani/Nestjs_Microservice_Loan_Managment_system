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
  Query,
} from '@nestjs/common';
import { ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateLoanDto } from './dto/create-loan.dto';
import { DecimalPlacesPipe } from './pipes/loan-amountDecimalPlacesValidation';
import { LoanStatusValidation } from './pipes/loan-statusValidation';
import { LoanStatus } from './loan-status.enum';
import { LoanService } from './loan.service';

@ApiTags('Loan')
@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createLoan(
    @Body('amount', DecimalPlacesPipe) amount: number,
    @Body() createLoanDto: CreateLoanDto,
  ) {

    return await this.loanService.createLoan(createLoanDto);
  }

  @Get()
  async findAllLoanByPagination(
    @Query('take') take: number = 9, // Default to 20 if 'take' is not provided
    @Query('page') page: number = 1, // Default to 1 if 'page' is not provided
  ) {
    const data = await this.loanService.findLoan(take, page);
    return data;
  }

  @Get(':loanId')
  async findOneLoanById(@Param('loanId') loanId: string) {
    return await this.loanService.findOneLoanById(loanId);
  }

  @Patch(':loanId/status')
  @ApiParam({ name: 'loanId', type: 'string' })
  async updateLoan(
    @Param('loanId') loanId: string,
    @Body('status', LoanStatusValidation) status: LoanStatus,
  ) {
    return await this.loanService.updateLoan(loanId, status);
  }
  @Delete(':loanId')
  @ApiParam({ name: 'loanId' })
  async removeLoan(@Param('loanId') loanId: string) {
    return await this.loanService.removeLoan(loanId);
  }
}
