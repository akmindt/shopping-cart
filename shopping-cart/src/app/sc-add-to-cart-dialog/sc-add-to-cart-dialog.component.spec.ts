import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScAddToCartDialogComponent } from './sc-add-to-cart-dialog.component';

describe('ScAddToCartDialogComponent', () => {
  let component: ScAddToCartDialogComponent;
  let fixture: ComponentFixture<ScAddToCartDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScAddToCartDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScAddToCartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
