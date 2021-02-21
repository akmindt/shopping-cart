import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScToolbarComponent } from './sc-toolbar.component';

describe('ScToolbarComponent', () => {
  let component: ScToolbarComponent;
  let fixture: ComponentFixture<ScToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
