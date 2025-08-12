import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationDuProjet } from './configuration-du-projet';

describe('ConfigurationDuProjet', () => {
  let component: ConfigurationDuProjet;
  let fixture: ComponentFixture<ConfigurationDuProjet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurationDuProjet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationDuProjet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
