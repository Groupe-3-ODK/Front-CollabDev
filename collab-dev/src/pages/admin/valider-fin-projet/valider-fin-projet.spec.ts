import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderFinProjet } from './valider-fin-projet';

describe('ValiderFinProjet', () => {
  let component: ValiderFinProjet;
  let fixture: ComponentFixture<ValiderFinProjet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValiderFinProjet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValiderFinProjet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
