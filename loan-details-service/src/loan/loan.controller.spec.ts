import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('LoanController', () => {
  let controller: LoanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoanController],
      providers: [LoanService],
    }).compile();

    controller = module.get<LoanController>(LoanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
