import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrozenFoodComponent } from './frozen-food.component';

describe('FrozenFoodComponent', () => {
  let component: FrozenFoodComponent;
  let fixture: ComponentFixture<FrozenFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrozenFoodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrozenFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
