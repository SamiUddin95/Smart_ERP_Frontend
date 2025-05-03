import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceCheckFormComponent } from './price-check-form.component';

describe('PriceCheckFormComponent', () => {
  let component: PriceCheckFormComponent;
  let fixture: ComponentFixture<PriceCheckFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriceCheckFormComponent]
    });
    fixture = TestBed.createComponent(PriceCheckFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
