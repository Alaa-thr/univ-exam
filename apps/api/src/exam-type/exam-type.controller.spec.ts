import { Test, TestingModule } from '@nestjs/testing';
import { ExamTypeController } from './exam-type.controller';
import { ExamTypeService } from './exam-type.service';

describe('ExamTypeController', () => {
  let controller: ExamTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamTypeController],
      providers: [ExamTypeService],
    }).compile();

    controller = module.get<ExamTypeController>(ExamTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
