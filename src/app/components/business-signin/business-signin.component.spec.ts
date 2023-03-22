import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSigninComponent } from './business-signin.component';

describe('BusinessSigninComponent', () => {
  let component: BusinessSigninComponent;
  let fixture: ComponentFixture<BusinessSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessSigninComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
