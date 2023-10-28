import { Test, TestingModule } from '@nestjs/testing';
import { MissionHistoryController } from './mission_history.controller';
import { MissionHistoryService } from './mission_history.service';

describe('MissionHistoryController', () => {
  let controller: MissionHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MissionHistoryController],
      providers: [MissionHistoryService],
    }).compile();

    controller = module.get<MissionHistoryController>(MissionHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
