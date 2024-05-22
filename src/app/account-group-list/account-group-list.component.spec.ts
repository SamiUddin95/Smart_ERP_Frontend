import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountGroupListComponent } from './account-group-list.component';

describe('AccountGroupListComponent', () => {
  let component: AccountGroupListComponent;
  let fixture: ComponentFixture<AccountGroupListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountGroupListComponent]
    });
    fixture = TestBed.createComponent(AccountGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
