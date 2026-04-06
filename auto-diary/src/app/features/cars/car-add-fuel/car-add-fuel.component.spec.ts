import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarAddFuelComponent } from './car-add-fuel.component';

describe('CarAddFuelComponent', () => {
  let component: CarAddFuelComponent;
  let fixture: ComponentFixture<CarAddFuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarAddFuelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarAddFuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
