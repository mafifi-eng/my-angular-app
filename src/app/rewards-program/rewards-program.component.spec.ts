import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsProgramComponent } from './rewards-program.component';

describe('RewardsProgramComponent', () => {
  let component: RewardsProgramComponent;
  let fixture: ComponentFixture<RewardsProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RewardsProgramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RewardsProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
