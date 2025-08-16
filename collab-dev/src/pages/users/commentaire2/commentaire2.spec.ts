import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Commentaire2 } from './commentaire2';

describe('Commentaire2', () => {
  let component: Commentaire2;
  let fixture: ComponentFixture<Commentaire2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Commentaire2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Commentaire2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
