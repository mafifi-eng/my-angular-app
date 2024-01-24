import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetSuppliesComponent } from './pet-supplies.component';

describe('PetSuppliesComponent', () => {
  let component: PetSuppliesComponent;
  let fixture: ComponentFixture<PetSuppliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetSuppliesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetSuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
