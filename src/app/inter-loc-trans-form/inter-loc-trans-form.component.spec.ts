import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterLocTransFormComponent } from './inter-loc-trans-form.component';

describe('InterLocTransFormComponent', () => {
  let component: InterLocTransFormComponent;
  let fixture: ComponentFixture<InterLocTransFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterLocTransFormComponent]
    });
    fixture = TestBed.createComponent(InterLocTransFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
