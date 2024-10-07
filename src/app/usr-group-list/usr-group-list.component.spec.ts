import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsrGroupListComponent } from './usr-group-list.component';

describe('UsrGroupListComponent', () => {
  let component: UsrGroupListComponent;
  let fixture: ComponentFixture<UsrGroupListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsrGroupListComponent]
    });
    fixture = TestBed.createComponent(UsrGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
