import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAddformComponent } from './business-addform.component';

describe('BusinessAddformComponent', () => {
  let component: BusinessAddformComponent;
  let fixture: ComponentFixture<BusinessAddformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessAddformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessAddformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
