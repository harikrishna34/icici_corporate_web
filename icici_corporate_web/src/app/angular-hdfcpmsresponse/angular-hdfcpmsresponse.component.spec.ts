import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularHDFCPMSResponseComponent } from './angular-hdfcpmsresponse.component';

describe('AngularHDFCPMSResponseComponent', () => {
  let component: AngularHDFCPMSResponseComponent;
  let fixture: ComponentFixture<AngularHDFCPMSResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularHDFCPMSResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularHDFCPMSResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
