import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentedShopsComponent } from './rented-shops.component';

describe('RentedShopsComponent', () => {
  let component: RentedShopsComponent;
  let fixture: ComponentFixture<RentedShopsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentedShopsComponent]
    });
    fixture = TestBed.createComponent(RentedShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
