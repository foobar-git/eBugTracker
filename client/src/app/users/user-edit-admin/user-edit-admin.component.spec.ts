import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditAdminComponent } from './user-edit-admin.component';

describe('UserEditAdminComponent', () => {
  let component: UserEditAdminComponent;
  let fixture: ComponentFixture<UserEditAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEditAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
