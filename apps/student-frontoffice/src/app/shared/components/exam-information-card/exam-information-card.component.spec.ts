import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamInformationCardComponent } from './exam-information-card.component';

describe('ExamInformationCardComponent', () => {
  let component: ExamInformationCardComponent;
  let fixture: ComponentFixture<ExamInformationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExamInformationCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamInformationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
