import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsToApproveComponent } from './projects-to-approve.component';

describe('ProjectsToApproveComponent', () => {
  let component: ProjectsToApproveComponent;
  let fixture: ComponentFixture<ProjectsToApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsToApproveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsToApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
