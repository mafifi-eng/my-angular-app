import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioAndOrganicFoodComponent } from './bio-and-organic-food.component';

describe('BioAndOrganicFoodComponent', () => {
  let component: BioAndOrganicFoodComponent;
  let fixture: ComponentFixture<BioAndOrganicFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BioAndOrganicFoodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BioAndOrganicFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
