import { Test, TestingModule } from '@nestjs/testing';
import { ExamTypeService } from './exam-type.service';

describe('ExamTypeService', () => {
  let service: ExamTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamTypeService],
    }).compile();

    service = module.get<ExamTypeService>(ExamTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
