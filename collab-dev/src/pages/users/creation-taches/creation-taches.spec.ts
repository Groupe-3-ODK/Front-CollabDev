import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationTaches } from './creation-taches';

describe('CreationTaches', () => {
  let component: CreationTaches;
  let fixture: ComponentFixture<CreationTaches>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationTaches]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationTaches);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
