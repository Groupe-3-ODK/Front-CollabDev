import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectComponent } from './new-project';


describe('NewProject', () => {
  let component: NewProjectComponent;
  let fixture: ComponentFixture<NewProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
