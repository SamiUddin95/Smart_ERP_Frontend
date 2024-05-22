import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurhaseFormComponent } from './purhase-form.component';

describe('PurhaseFormComponent', () => {
  let component: PurhaseFormComponent;
  let fixture: ComponentFixture<PurhaseFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurhaseFormComponent]
    });
    fixture = TestBed.createComponent(PurhaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
