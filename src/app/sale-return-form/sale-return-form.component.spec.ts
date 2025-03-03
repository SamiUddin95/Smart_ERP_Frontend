import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleReturnFormComponent } from './sale-return-form.component';

describe('SaleReturnFormComponent', () => {
  let component: SaleReturnFormComponent;
  let fixture: ComponentFixture<SaleReturnFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleReturnFormComponent]
    });
    fixture = TestBed.createComponent(SaleReturnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
