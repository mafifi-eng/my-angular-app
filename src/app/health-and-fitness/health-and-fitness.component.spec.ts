import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthAndFitnessComponent } from './health-and-fitness.component';

describe('HealthAndFitnessComponent', () => {
  let component: HealthAndFitnessComponent;
  let fixture: ComponentFixture<HealthAndFitnessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthAndFitnessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HealthAndFitnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
