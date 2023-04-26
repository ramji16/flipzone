import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuisnessSellersComponent } from './buisness-sellers.component';

describe('BuisnessSellersComponent', () => {
  let component: BuisnessSellersComponent;
  let fixture: ComponentFixture<BuisnessSellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuisnessSellersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuisnessSellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
