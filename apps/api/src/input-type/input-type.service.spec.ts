import { Test, TestingModule } from '@nestjs/testing';
import { InputTypeService } from './input-type.service';

describe('InputTypeService', () => {
  let service: InputTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InputTypeService],
    }).compile();

    service = module.get<InputTypeService>(InputTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
