import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimunQtyAlertComponent } from './minimun-qty-alert.component';

describe('MinimunQtyAlertComponent', () => {
  let component: MinimunQtyAlertComponent;
  let fixture: ComponentFixture<MinimunQtyAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinimunQtyAlertComponent]
    });
    fixture = TestBed.createComponent(MinimunQtyAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
