import { DailydebitController } from './dailydebit.controller';
import { DailydebitService } from './dailydebit.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('DailydebitController', () => {
  let controller: DailydebitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailydebitController],
      providers: [DailydebitService],
    }).compile();

    controller = module.get<DailydebitController>(DailydebitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
