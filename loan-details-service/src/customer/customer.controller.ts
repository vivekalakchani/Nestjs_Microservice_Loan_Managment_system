import { CustomerService } from './customer.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ApiParam } from '@nestjs/swagger';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customerService.createCustomer(createCustomerDto);
  }

  @Get()
  async findAllCustomer() {
    return await this.customerService.findAllCustomer();
  }

  @Get(':customerId')
  async findOneCustomer(@Param('customerId') customerId: string) {
    return await this.customerService.findOneCustomer(customerId);
  }

  @Delete(':customerId')
  async removeCustomer(@Param('customerId') customerId: string) {
    return await this.customerService.removeCustomer(customerId);
  }
}
