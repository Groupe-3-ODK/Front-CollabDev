import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementRequest } from './management-request';

describe('ManagementRequest', () => {
  let component: ManagementRequest;
  let fixture: ComponentFixture<ManagementRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementRequest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementRequest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
