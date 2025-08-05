import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjecttodoComponent } from './projecttodo.component';

describe('ProjecttodoComponent', () => {
  let component: ProjecttodoComponent;
  let fixture: ComponentFixture<ProjecttodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjecttodoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjecttodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
