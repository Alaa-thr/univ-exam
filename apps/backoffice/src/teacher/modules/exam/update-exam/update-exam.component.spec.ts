import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExamComponent } from './update-exam.component';

describe('CreateExamComponent', () => {
  let component: CreateExamComponent;
  let fixture: ComponentFixture<CreateExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateExamComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
