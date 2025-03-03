import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StckAdjListComponent } from './stck-adj-list.component';

describe('StckAdjListComponent', () => {
  let component: StckAdjListComponent;
  let fixture: ComponentFixture<StckAdjListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StckAdjListComponent]
    });
    fixture = TestBed.createComponent(StckAdjListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
