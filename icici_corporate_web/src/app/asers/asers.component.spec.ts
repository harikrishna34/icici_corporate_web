import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsersComponent } from './asers.component';

describe('AsersComponent', () => {
  let component: AsersComponent;
  let fixture: ComponentFixture<AsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

