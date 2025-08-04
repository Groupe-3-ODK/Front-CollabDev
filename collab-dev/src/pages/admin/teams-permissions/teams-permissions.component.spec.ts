import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsPermissionsComponent } from './teams-permissions.component';

describe('TeamsPermissionsComponent', () => {
  let component: TeamsPermissionsComponent;
  let fixture: ComponentFixture<TeamsPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamsPermissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
