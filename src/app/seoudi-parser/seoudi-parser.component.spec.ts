import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeoudiParserComponent } from './seoudi-parser.component';

describe('SeoudiParserComponent', () => {
  let component: SeoudiParserComponent;
  let fixture: ComponentFixture<SeoudiParserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeoudiParserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeoudiParserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
