import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterLocTransListComponent } from './inter-loc-trans-list.component';

describe('InterLocTransListComponent', () => {
  let component: InterLocTransListComponent;
  let fixture: ComponentFixture<InterLocTransListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterLocTransListComponent]
    });
    fixture = TestBed.createComponent(InterLocTransListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
