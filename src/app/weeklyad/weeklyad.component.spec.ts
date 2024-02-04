import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyadComponent } from './weeklyad.component';

describe('WeeklyadComponent', () => {
  let component: WeeklyadComponent;
  let fixture: ComponentFixture<WeeklyadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeeklyadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
