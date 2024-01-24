import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningAndHouseholdComponent } from './cleaning-and-household.component';

describe('CleaningAndHouseholdComponent', () => {
  let component: CleaningAndHouseholdComponent;
  let fixture: ComponentFixture<CleaningAndHouseholdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CleaningAndHouseholdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CleaningAndHouseholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
