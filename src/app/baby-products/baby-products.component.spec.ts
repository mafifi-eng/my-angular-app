import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabyProductsComponent } from './baby-products.component';

describe('BabyProductsComponent', () => {
  let component: BabyProductsComponent;
  let fixture: ComponentFixture<BabyProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BabyProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BabyProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
