import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularHDFCServiceResponseComponent } from './angular-hdfcservice-response.component';

describe('AngularHDFCServiceResponseComponent', () => {
  let component: AngularHDFCServiceResponseComponent;
  let fixture: ComponentFixture<AngularHDFCServiceResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularHDFCServiceResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularHDFCServiceResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
