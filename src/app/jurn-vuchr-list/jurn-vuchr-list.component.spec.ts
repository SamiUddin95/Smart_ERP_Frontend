import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JurnVuchrListComponent } from './jurn-vuchr-list.component';

describe('JurnVuchrListComponent', () => {
  let component: JurnVuchrListComponent;
  let fixture: ComponentFixture<JurnVuchrListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JurnVuchrListComponent]
    });
    fixture = TestBed.createComponent(JurnVuchrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
