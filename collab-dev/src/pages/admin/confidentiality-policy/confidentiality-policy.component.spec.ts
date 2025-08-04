import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfidentialityPolicyComponent } from './confidentiality-policy.component';

describe('ConfidentialityPolicyComponent', () => {
  let component: ConfidentialityPolicyComponent;
  let fixture: ComponentFixture<ConfidentialityPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfidentialityPolicyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfidentialityPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
