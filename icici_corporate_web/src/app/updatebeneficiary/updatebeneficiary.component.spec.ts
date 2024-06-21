import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatebeneficiaryComponent } from './updatebeneficiary.component';

describe('UpdatebeneficiaryComponent', () => {
  let component: UpdatebeneficiaryComponent;
  let fixture: ComponentFixture<UpdatebeneficiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatebeneficiaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatebeneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
