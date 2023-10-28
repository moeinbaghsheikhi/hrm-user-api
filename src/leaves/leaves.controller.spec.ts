import { Test, TestingModule } from '@nestjs/testing';
import { LeavesController } from './leaves.controller';
import { LeavesService } from './leaves.service';

describe('LeavesController', () => {
  let controller: LeavesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeavesController],
      providers: [LeavesService],
    }).compile();

    controller = module.get<LeavesController>(LeavesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
