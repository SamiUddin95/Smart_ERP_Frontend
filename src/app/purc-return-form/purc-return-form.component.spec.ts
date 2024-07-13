import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurcOrderFormComponent } from './purc-order-form.component';

describe('PurcOrderFormComponent', () => {
  let component: PurcOrderFormComponent;
  let fixture: ComponentFixture<PurcOrderFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurcOrderFormComponent]
    });
    fixture = TestBed.createComponent(PurcOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
