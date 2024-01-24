import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCupboardComponent } from './food-cupboard.component';

describe('FoodCupboardComponent', () => {
  let component: FoodCupboardComponent;
  let fixture: ComponentFixture<FoodCupboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodCupboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoodCupboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
