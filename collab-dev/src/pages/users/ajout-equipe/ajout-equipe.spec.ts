import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutEquipe } from './ajout-equipe';

describe('AjoutEquipe', () => {
  let component: AjoutEquipe;
  let fixture: ComponentFixture<AjoutEquipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutEquipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutEquipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
