import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessHomeComponentComponent } from './business-home-component.component';

describe('BusinessHomeComponentComponent', () => {
  let component: BusinessHomeComponentComponent;
  let fixture: ComponentFixture<BusinessHomeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessHomeComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessHomeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
