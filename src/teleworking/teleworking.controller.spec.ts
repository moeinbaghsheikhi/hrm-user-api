import { Test, TestingModule } from '@nestjs/testing';
import { TeleworkingController } from './teleworking.controller';
import { TeleworkingService } from './teleworking.service';

describe('TeleworkingController', () => {
  let controller: TeleworkingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeleworkingController],
      providers: [TeleworkingService],
    }).compile();

    controller = module.get<TeleworkingController>(TeleworkingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
