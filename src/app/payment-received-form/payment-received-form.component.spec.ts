import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentReceivedFormComponent } from './payment-received-form.component';

describe('PaymentReceivedFormComponent', () => {
  let component: PaymentReceivedFormComponent;
  let fixture: ComponentFixture<PaymentReceivedFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentReceivedFormComponent]
    });
    fixture = TestBed.createComponent(PaymentReceivedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
