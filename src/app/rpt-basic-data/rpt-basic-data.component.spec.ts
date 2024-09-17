import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RptBasicDataComponent } from './rpt-basic-data.component';

describe('RptBasicDataComponent', () => {
  let component: RptBasicDataComponent;
  let fixture: ComponentFixture<RptBasicDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RptBasicDataComponent]
    });
    fixture = TestBed.createComponent(RptBasicDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
