import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetroParserComponent } from './metro-parser.component';

describe('MetroParserComponent', () => {
  let component: MetroParserComponent;
  let fixture: ComponentFixture<MetroParserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetroParserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MetroParserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
