import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScChangeQuantityComponent } from './sc-change-quantity.component';

describe('ScChangeQuantityComponent', () => {
  let component: ScChangeQuantityComponent;
  let fixture: ComponentFixture<ScChangeQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScChangeQuantityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScChangeQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
