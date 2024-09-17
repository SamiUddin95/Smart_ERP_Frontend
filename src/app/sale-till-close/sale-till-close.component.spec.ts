import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleTillCloseComponent } from './sale-till-close.component';

describe('SaleTillCloseComponent', () => {
  let component: SaleTillCloseComponent;
  let fixture: ComponentFixture<SaleTillCloseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleTillCloseComponent]
    });
    fixture = TestBed.createComponent(SaleTillCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
