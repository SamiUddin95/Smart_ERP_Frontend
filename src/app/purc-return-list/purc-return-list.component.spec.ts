import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurcOrderListComponent } from './purc-order-list.component';

describe('PurcOrderListComponent', () => {
  let component: PurcOrderListComponent;
  let fixture: ComponentFixture<PurcOrderListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurcOrderListComponent]
    });
    fixture = TestBed.createComponent(PurcOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
