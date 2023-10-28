import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceCorrectionService } from './attendance_correction.service';

describe('AttendanceCorrectionService', () => {
  let service: AttendanceCorrectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttendanceCorrectionService],
    }).compile();

    service = module.get<AttendanceCorrectionService>(AttendanceCorrectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
