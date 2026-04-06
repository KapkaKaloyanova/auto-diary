import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarAddDocumentComponent } from './car-add-document.component';

describe('CarAddDocumentComponent', () => {
  let component: CarAddDocumentComponent;
  let fixture: ComponentFixture<CarAddDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarAddDocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarAddDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
