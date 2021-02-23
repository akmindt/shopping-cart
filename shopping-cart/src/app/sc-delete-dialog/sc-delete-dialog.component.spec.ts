import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScDeleteDialogComponent } from './sc-delete-dialog.component';

describe('ScDeleteDialogComponent', () => {
  let component: ScDeleteDialogComponent;
  let fixture: ComponentFixture<ScDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
