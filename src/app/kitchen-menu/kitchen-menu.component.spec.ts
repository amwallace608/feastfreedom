import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenMenuComponent } from './kitchen-menu.component';

describe('KitchenMenuComponent', () => {
  let component: KitchenMenuComponent;
  let fixture: ComponentFixture<KitchenMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KitchenMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
