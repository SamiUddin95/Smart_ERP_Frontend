import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesManListComponent } from './sales-man-list.component';

describe('SalesManListComponent', () => {
  let component: SalesManListComponent;
  let fixture: ComponentFixture<SalesManListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesManListComponent]
    });
    fixture = TestBed.createComponent(SalesManListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
