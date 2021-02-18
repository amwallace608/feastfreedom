import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterKitchenComponent } from './register-kitchen.component';

describe('RegisterKitchenComponent', () => {
  let component: RegisterKitchenComponent;
  let fixture: ComponentFixture<RegisterKitchenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterKitchenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterKitchenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
