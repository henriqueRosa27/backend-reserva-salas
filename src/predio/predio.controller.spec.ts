import { Test, TestingModule } from '@nestjs/testing';
import { PredioController } from './predio.controller';

describe('PredioController', () => {
  let controller: PredioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PredioController],
    }).compile();

    controller = module.get<PredioController>(PredioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
