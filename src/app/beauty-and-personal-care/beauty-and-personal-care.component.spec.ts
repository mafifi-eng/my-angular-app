import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeautyAndPersonalCareComponent } from './beauty-and-personal-care.component';

describe('BeautyAndPersonalCareComponent', () => {
  let component: BeautyAndPersonalCareComponent;
  let fixture: ComponentFixture<BeautyAndPersonalCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeautyAndPersonalCareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeautyAndPersonalCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
