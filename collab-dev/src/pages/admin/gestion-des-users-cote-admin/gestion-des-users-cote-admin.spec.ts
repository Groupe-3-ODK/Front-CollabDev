import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDesUsersCoteAdmin } from './gestion-des-users-cote-admin';

describe('GestionDesUsersCoteAdmin', () => {
  let component: GestionDesUsersCoteAdmin;
  let fixture: ComponentFixture<GestionDesUsersCoteAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionDesUsersCoteAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionDesUsersCoteAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
