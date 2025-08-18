import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProjetAdmin } from './gestion-projet-admin';

describe('GestionProjetAdmin', () => {
  let component: GestionProjetAdmin;
  let fixture: ComponentFixture<GestionProjetAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionProjetAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionProjetAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
