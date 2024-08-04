import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleTillOpenComponent } from './sale-till-open.component';

describe('SaleTillOpenComponent', () => {
  let component: SaleTillOpenComponent;
  let fixture: ComponentFixture<SaleTillOpenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleTillOpenComponent]
    });
    fixture = TestBed.createComponent(SaleTillOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
