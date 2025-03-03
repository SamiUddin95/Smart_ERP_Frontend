import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StckAdjFormComponent } from './stck-adj-form.component';

describe('StckAdjFormComponent', () => {
  let component: StckAdjFormComponent;
  let fixture: ComponentFixture<StckAdjFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StckAdjFormComponent]
    });
    fixture = TestBed.createComponent(StckAdjFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
