import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceCorrectionController } from './attendance_correction.controller';
import { AttendanceCorrectionService } from './attendance_correction.service';

describe('AttendanceCorrectionController', () => {
  let controller: AttendanceCorrectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttendanceCorrectionController],
      providers: [AttendanceCorrectionService],
    }).compile();

    controller = module.get<AttendanceCorrectionController>(AttendanceCorrectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
