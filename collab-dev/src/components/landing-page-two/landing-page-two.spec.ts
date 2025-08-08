import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageTwo } from './landing-page-two';

describe('LandingPageTwo', () => {
  let component: LandingPageTwo;
  let fixture: ComponentFixture<LandingPageTwo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageTwo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPageTwo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
