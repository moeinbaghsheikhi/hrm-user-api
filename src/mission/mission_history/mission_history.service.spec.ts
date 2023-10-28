import { Test, TestingModule } from '@nestjs/testing';
import { MissionHistoryService } from './mission_history.service';

describe('MissionHistoryService', () => {
  let service: MissionHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MissionHistoryService],
    }).compile();

    service = module.get<MissionHistoryService>(MissionHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
