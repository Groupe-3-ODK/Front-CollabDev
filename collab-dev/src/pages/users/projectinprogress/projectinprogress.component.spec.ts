import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectinprogressComponent } from './projectinprogress.component';

describe('ProjectinprogressComponent', () => {
  let component: ProjectinprogressComponent;
  let fixture: ComponentFixture<ProjectinprogressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectinprogressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectinprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
