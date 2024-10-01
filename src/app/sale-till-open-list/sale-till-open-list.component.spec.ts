import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleTillOpenListComponent } from './sale-till-open-list.component';

describe('SaleTillOpenListComponent', () => {
  let component: SaleTillOpenListComponent;
  let fixture: ComponentFixture<SaleTillOpenListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleTillOpenListComponent]
    });
    fixture = TestBed.createComponent(SaleTillOpenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
