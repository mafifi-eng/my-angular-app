import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartphonesTabletsAndWearablesComponent } from './smartphones-tablets-and-wearables.component';

describe('SmartphonesTabletsAndWearablesComponent', () => {
  let component: SmartphonesTabletsAndWearablesComponent;
  let fixture: ComponentFixture<SmartphonesTabletsAndWearablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartphonesTabletsAndWearablesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmartphonesTabletsAndWearablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
