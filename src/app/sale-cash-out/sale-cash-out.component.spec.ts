import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleCashOutComponent } from './sale-cash-out.component';

describe('SaleCashOutComponent', () => {
  let component: SaleCashOutComponent;
  let fixture: ComponentFixture<SaleCashOutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleCashOutComponent]
    });
    fixture = TestBed.createComponent(SaleCashOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
