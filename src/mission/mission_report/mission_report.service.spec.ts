import { Test, TestingModule } from '@nestjs/testing';
import { MissionReportService } from './mission_report.service';

describe('MissionReportService', () => {
  let service: MissionReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MissionReportService],
    }).compile();

    service = module.get<MissionReportService>(MissionReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
