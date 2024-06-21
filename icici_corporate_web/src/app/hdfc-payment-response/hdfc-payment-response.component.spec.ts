import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HdfcPaymentResponseComponent } from './hdfc-payment-response.component';

describe('HdfcPaymentResponseComponent', () => {
  let component: HdfcPaymentResponseComponent;
  let fixture: ComponentFixture<HdfcPaymentResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HdfcPaymentResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HdfcPaymentResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
