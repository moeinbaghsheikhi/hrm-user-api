import { Test, TestingModule } from '@nestjs/testing';
import { MissionReportController } from './mission_report.controller';
import { MissionReportService } from './mission_report.service';

describe('MissionReportController', () => {
  let controller: MissionReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MissionReportController],
      providers: [MissionReportService],
    }).compile();

    controller = module.get<MissionReportController>(MissionReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
