import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondDashboard } from './second-dashboard';

describe('SecondDashboard', () => {
  let component: SecondDashboard;
  let fixture: ComponentFixture<SecondDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
