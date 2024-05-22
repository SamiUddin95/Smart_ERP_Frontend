import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCatListComponent } from './account-cat-list.component';

describe('AccountCatListComponent', () => {
  let component: AccountCatListComponent;
  let fixture: ComponentFixture<AccountCatListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountCatListComponent]
    });
    fixture = TestBed.createComponent(AccountCatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
