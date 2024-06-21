import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentManagmentServicesComponent } from './payment-managment-services.component';

describe('PaymentManagmentServicesComponent', () => {
  let component: PaymentManagmentServicesComponent;
  let fixture: ComponentFixture<PaymentManagmentServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentManagmentServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentManagmentServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
