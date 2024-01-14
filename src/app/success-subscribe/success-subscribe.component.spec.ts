import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessSubscribeComponent } from './success-subscribe.component';

describe('SuccessSubscribeComponent', () => {
  let component: SuccessSubscribeComponent;
  let fixture: ComponentFixture<SuccessSubscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessSubscribeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccessSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
