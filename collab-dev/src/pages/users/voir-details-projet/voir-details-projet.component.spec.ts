import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirDetailsProjetComponent } from './voir-details-projet.component';

describe('VoirDetailsProjetComponent', () => {
  let component: VoirDetailsProjetComponent;
  let fixture: ComponentFixture<VoirDetailsProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoirDetailsProjetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoirDetailsProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
