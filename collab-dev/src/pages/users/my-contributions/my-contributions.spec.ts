import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyContributions } from './my-contributions';

describe('MyContributions', () => {
  let component: MyContributions;
  let fixture: ComponentFixture<MyContributions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyContributions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyContributions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
