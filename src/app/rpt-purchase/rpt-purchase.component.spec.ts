import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RptPurchaseComponent } from './rpt-purchase.component';

describe('RptPurchaseComponent', () => {
  let component: RptPurchaseComponent;
  let fixture: ComponentFixture<RptPurchaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RptPurchaseComponent]
    });
    fixture = TestBed.createComponent(RptPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
