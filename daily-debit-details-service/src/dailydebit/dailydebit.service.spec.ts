import { Test, TestingModule } from '@nestjs/testing';
import { DailydebitService } from './dailydebit.service';

describe('DailydebitService', () => {
  let service: DailydebitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailydebitService],
    }).compile();

    service = module.get<DailydebitService>(DailydebitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
