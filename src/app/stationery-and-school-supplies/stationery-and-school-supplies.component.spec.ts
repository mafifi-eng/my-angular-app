import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationeryAndSchoolSuppliesComponent } from './stationery-and-school-supplies.component';

describe('StationeryAndSchoolSuppliesComponent', () => {
  let component: StationeryAndSchoolSuppliesComponent;
  let fixture: ComponentFixture<StationeryAndSchoolSuppliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationeryAndSchoolSuppliesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StationeryAndSchoolSuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
