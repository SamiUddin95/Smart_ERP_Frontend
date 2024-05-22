import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyPriceFormComponent } from './party-price-form.component';

describe('PartyPriceFormComponent', () => {
  let component: PartyPriceFormComponent;
  let fixture: ComponentFixture<PartyPriceFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartyPriceFormComponent]
    });
    fixture = TestBed.createComponent(PartyPriceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
