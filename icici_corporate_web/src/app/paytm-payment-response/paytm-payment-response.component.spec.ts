import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaytmPaymentResponseComponent } from './paytm-payment-response.component';

describe('PaytmPaymentResponseComponent', () => {
  let component: PaytmPaymentResponseComponent;
  let fixture: ComponentFixture<PaytmPaymentResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaytmPaymentResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaytmPaymentResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
