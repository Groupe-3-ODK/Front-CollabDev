import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitProjectFormComponent } from './submit-project-form.component';

describe('SubmitProjectFormComponent', () => {
  let component: SubmitProjectFormComponent;
  let fixture: ComponentFixture<SubmitProjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitProjectFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
