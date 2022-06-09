import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSpecialityComponent } from './create-speciality.component';

describe('CreateSpecialityComponent', () => {
  let component: CreateSpecialityComponent;
  let fixture: ComponentFixture<CreateSpecialityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSpecialityComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSpecialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
