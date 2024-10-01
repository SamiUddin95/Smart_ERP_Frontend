import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RptPurchaseOrderComponent } from './rpt-purchase-order.component';

describe('RptPurchaseOrderComponent', () => {
  let component: RptPurchaseOrderComponent;
  let fixture: ComponentFixture<RptPurchaseOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RptPurchaseOrderComponent]
    });
    fixture = TestBed.createComponent(RptPurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
