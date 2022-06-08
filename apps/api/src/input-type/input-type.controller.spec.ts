import { Test, TestingModule } from '@nestjs/testing';
import { InputTypeController } from './input-type.controller';
import { InputTypeService } from './input-type.service';

describe('InputTypeController', () => {
  let controller: InputTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InputTypeController],
      providers: [InputTypeService],
    }).compile();

    controller = module.get<InputTypeController>(InputTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
