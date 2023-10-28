import { Test, TestingModule } from '@nestjs/testing';
import { TeleworkingService } from './teleworking.service';

describe('TeleworkingService', () => {
  let service: TeleworkingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeleworkingService],
    }).compile();

    service = module.get<TeleworkingService>(TeleworkingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
