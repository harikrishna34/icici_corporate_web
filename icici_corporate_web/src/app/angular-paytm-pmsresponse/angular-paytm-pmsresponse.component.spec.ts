import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPaytmPMSResponseComponent } from './angular-paytm-pmsresponse.component';

describe('AngularPaytmPMSResponseComponent', () => {
  let component: AngularPaytmPMSResponseComponent;
  let fixture: ComponentFixture<AngularPaytmPMSResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularPaytmPMSResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPaytmPMSResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
