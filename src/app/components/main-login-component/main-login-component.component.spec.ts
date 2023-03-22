import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLoginComponentComponent } from './main-login-component.component';

describe('MainLoginComponentComponent', () => {
  let component: MainLoginComponentComponent;
  let fixture: ComponentFixture<MainLoginComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainLoginComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLoginComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
