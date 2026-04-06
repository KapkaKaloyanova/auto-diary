import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarAddServiceComponent } from './car-add-service.component';

describe('CarAddServiceComponent', () => {
  let component: CarAddServiceComponent;
  let fixture: ComponentFixture<CarAddServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarAddServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarAddServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
