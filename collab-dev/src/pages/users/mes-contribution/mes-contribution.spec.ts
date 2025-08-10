import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesContribution } from './mes-contribution';

describe('MesContribution', () => {
  let component: MesContribution;
  let fixture: ComponentFixture<MesContribution>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesContribution]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesContribution);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
