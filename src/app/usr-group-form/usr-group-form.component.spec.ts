import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsrGroupFormComponent } from './usr-group-form.component';

describe('UsrGroupFormComponent', () => {
  let component: UsrGroupFormComponent;
  let fixture: ComponentFixture<UsrGroupFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsrGroupFormComponent]
    });
    fixture = TestBed.createComponent(UsrGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
