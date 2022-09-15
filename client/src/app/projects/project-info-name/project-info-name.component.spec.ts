import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInfoNameComponent } from './project-info-name.component';

describe('ProjectInfoNameComponent', () => {
  let component: ProjectInfoNameComponent;
  let fixture: ComponentFixture<ProjectInfoNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectInfoNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInfoNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
