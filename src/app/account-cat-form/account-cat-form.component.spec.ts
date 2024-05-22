import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCatFormComponent } from './account-cat-form.component';

describe('AccountCatFormComponent', () => {
  let component: AccountCatFormComponent;
  let fixture: ComponentFixture<AccountCatFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountCatFormComponent]
    });
    fixture = TestBed.createComponent(AccountCatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
