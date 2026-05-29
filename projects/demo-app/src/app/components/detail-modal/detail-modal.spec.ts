import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailModal } from './detail-modal';

describe('DetailModal', () => {
  let component: DetailModal;
  let fixture: ComponentFixture<DetailModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailModal],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
