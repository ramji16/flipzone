import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessWalletComponent } from './business-wallet.component';

describe('BusinessWalletComponent', () => {
  let component: BusinessWalletComponent;
  let fixture: ComponentFixture<BusinessWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
