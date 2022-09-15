import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileUsernameComponent } from './user-profile-username.component';

describe('UserProfileUsernameComponent', () => {
  let component: UserProfileUsernameComponent;
  let fixture: ComponentFixture<UserProfileUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileUsernameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
