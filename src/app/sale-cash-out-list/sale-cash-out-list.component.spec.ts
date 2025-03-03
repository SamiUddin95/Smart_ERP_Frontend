import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleCashOutListComponent } from './sale-cash-out-list.component';

describe('SaleCashOutListComponent', () => {
  let component: SaleCashOutListComponent;
  let fixture: ComponentFixture<SaleCashOutListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleCashOutListComponent]
    });
    fixture = TestBed.createComponent(SaleCashOutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
