import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionAsk } from './contribution-ask';

describe('ContributionAsk', () => {
  let component: ContributionAsk;
  let fixture: ComponentFixture<ContributionAsk>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContributionAsk]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContributionAsk);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
