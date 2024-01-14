import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllrewardsComponent } from './allrewards.component';

describe('AllrewardsComponent', () => {
  let component: AllrewardsComponent;
  let fixture: ComponentFixture<AllrewardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllrewardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllrewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
