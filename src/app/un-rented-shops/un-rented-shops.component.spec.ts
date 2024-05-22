import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnRentedShopsComponent } from './un-rented-shops.component';

describe('UnRentedShopsComponent', () => {
  let component: UnRentedShopsComponent;
  let fixture: ComponentFixture<UnRentedShopsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnRentedShopsComponent]
    });
    fixture = TestBed.createComponent(UnRentedShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
