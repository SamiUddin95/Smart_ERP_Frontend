import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleCashInListComponent } from './sale-cash-in-list.component';

describe('SaleCashInListComponent', () => {
  let component: SaleCashInListComponent;
  let fixture: ComponentFixture<SaleCashInListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleCashInListComponent]
    });
    fixture = TestBed.createComponent(SaleCashInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
