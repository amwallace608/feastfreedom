import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaykitchensComponent } from './displaykitchens.component';

describe('DisplaykitchensComponent', () => {
  let component: DisplaykitchensComponent;
  let fixture: ComponentFixture<DisplaykitchensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaykitchensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaykitchensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
