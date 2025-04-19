import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarCodeshlefPrintComponent } from './bar-codeshlef-print.component';

describe('BarCodeshlefPrintComponent', () => {
  let component: BarCodeshlefPrintComponent;
  let fixture: ComponentFixture<BarCodeshlefPrintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarCodeshlefPrintComponent]
    });
    fixture = TestBed.createComponent(BarCodeshlefPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
