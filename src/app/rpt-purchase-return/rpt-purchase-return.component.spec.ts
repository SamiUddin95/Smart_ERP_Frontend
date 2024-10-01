import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RptPurchaseReturnComponent } from './rpt-purchase-return.component';

describe('RptPurchaseReturnComponent', () => {
  let component: RptPurchaseReturnComponent;
  let fixture: ComponentFixture<RptPurchaseReturnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RptPurchaseReturnComponent]
    });
    fixture = TestBed.createComponent(RptPurchaseReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
