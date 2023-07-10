import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateInputComponent } from './rate-input.component';

describe('RateInputComponent', () => {
  let component: RateInputComponent;
  let fixture: ComponentFixture<RateInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RateInputComponent]
    });
    fixture = TestBed.createComponent(RateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
