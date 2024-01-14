import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserCarrefoureComponent } from './parser-carrefoure.component';

describe('ParserCarrefoureComponent', () => {
  let component: ParserCarrefoureComponent;
  let fixture: ComponentFixture<ParserCarrefoureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParserCarrefoureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParserCarrefoureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
