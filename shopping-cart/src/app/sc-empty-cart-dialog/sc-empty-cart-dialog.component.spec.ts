import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScEmptyCartDialogComponent } from './sc-empty-cart-dialog.component';

describe('ScEmptyCartDialogComponent', () => {
  let component: ScEmptyCartDialogComponent;
  let fixture: ComponentFixture<ScEmptyCartDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScEmptyCartDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScEmptyCartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
