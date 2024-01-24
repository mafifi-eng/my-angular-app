import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAndGardenComponent } from './home-and-garden.component';

describe('HomeAndGardenComponent', () => {
  let component: HomeAndGardenComponent;
  let fixture: ComponentFixture<HomeAndGardenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAndGardenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeAndGardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
