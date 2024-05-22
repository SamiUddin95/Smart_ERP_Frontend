import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyPriceListComponent } from './party-price-list.component';

describe('PartyPriceListComponent', () => {
  let component: PartyPriceListComponent;
  let fixture: ComponentFixture<PartyPriceListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartyPriceListComponent]
    });
    fixture = TestBed.createComponent(PartyPriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
