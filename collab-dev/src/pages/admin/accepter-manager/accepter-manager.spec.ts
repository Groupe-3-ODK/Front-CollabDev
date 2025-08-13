import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccepterManager } from './accepter-manager';

describe('AccepterManager', () => {
  let component: AccepterManager;
  let fixture: ComponentFixture<AccepterManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccepterManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccepterManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
