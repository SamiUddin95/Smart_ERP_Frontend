import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurcOrderDashboardComponent } from './purc-order-dashboard.component';

describe('PurcOrderDashboardComponent', () => {
  let component: PurcOrderDashboardComponent;
  let fixture: ComponentFixture<PurcOrderDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurcOrderDashboardComponent]
    });
    fixture = TestBed.createComponent(PurcOrderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
