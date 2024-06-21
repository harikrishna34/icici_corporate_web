import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPaytmServiceResponseComponent } from './angular-paytm-service-response.component';

describe('AngularPaytmServiceResponseComponent', () => {
  let component: AngularPaytmServiceResponseComponent;
  let fixture: ComponentFixture<AngularPaytmServiceResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularPaytmServiceResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPaytmServiceResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
