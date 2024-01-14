import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowSubscribeComponent } from './know-subscribe.component';

describe('KnowSubscribeComponent', () => {
  let component: KnowSubscribeComponent;
  let fixture: ComponentFixture<KnowSubscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnowSubscribeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KnowSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
