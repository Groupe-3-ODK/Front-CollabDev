import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionUserCoteAdminComponent } from './gestion-user-cote-admin.component';

describe('GestionUserCoteAdminComponent', () => {
  let component: GestionUserCoteAdminComponent;
  let fixture: ComponentFixture<GestionUserCoteAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionUserCoteAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionUserCoteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
