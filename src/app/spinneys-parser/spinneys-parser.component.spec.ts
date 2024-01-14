import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinneysParserComponent } from './spinneys-parser.component';

describe('SpinneysParserComponent', () => {
  let component: SpinneysParserComponent;
  let fixture: ComponentFixture<SpinneysParserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinneysParserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpinneysParserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
