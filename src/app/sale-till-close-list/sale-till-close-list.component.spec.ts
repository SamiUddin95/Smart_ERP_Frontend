import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleTillCloseListComponent } from './sale-till-close-list.component';

describe('SaleTillCloseListComponent', () => {
  let component: SaleTillCloseListComponent;
  let fixture: ComponentFixture<SaleTillCloseListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleTillCloseListComponent]
    });
    fixture = TestBed.createComponent(SaleTillCloseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
