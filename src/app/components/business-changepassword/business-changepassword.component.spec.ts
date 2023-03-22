import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessChangepasswordComponent } from './business-changepassword.component';

describe('BusinessChangepasswordComponent', () => {
  let component: BusinessChangepasswordComponent;
  let fixture: ComponentFixture<BusinessChangepasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessChangepasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessChangepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
