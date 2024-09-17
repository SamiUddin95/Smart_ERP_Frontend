import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleCashInComponent } from './sale-cash-in.component';

describe('SaleCashInComponent', () => {
  let component: SaleCashInComponent;
  let fixture: ComponentFixture<SaleCashInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleCashInComponent]
    });
    fixture = TestBed.createComponent(SaleCashInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
