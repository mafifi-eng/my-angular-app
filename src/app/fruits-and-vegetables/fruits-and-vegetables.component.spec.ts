import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitsAndVegetablesComponent } from './fruits-and-vegetables.component';

describe('FruitsAndVegetablesComponent', () => {
  let component: FruitsAndVegetablesComponent;
  let fixture: ComponentFixture<FruitsAndVegetablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FruitsAndVegetablesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FruitsAndVegetablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
