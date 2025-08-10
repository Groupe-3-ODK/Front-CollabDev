import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerTache } from './creer-tache';

describe('CreerTache', () => {
  let component: CreerTache;
  let fixture: ComponentFixture<CreerTache>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerTache]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerTache);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
