import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JurnVuchrFormComponent } from './jurn-vuchr-form.component';

describe('JurnVuchrFormComponent', () => {
  let component: JurnVuchrFormComponent;
  let fixture: ComponentFixture<JurnVuchrFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JurnVuchrFormComponent]
    });
    fixture = TestBed.createComponent(JurnVuchrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
