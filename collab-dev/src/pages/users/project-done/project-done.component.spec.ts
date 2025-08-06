import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDoneComponent } from './project-done.component';

describe('ProjectDoneComponent', () => {
  let component: ProjectDoneComponent;
  let fixture: ComponentFixture<ProjectDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
