import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStudentComponent } from './update-student.component';

describe('CreateStudentComponent', () => {
  let component: CreateStudentComponent;
  let fixture: ComponentFixture<CreateStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateStudentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
