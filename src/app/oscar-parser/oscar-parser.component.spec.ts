import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OscarParserComponent } from './oscar-parser.component';

describe('OscarParserComponent', () => {
  let component: OscarParserComponent;
  let fixture: ComponentFixture<OscarParserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OscarParserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OscarParserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
