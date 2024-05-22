import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountGroupFormComponent } from './account-group-form.component';

describe('AccountGroupFormComponent', () => {
  let component: AccountGroupFormComponent;
  let fixture: ComponentFixture<AccountGroupFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountGroupFormComponent]
    });
    fixture = TestBed.createComponent(AccountGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
