import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicsAndAppliancesComponent } from './electronics-and-appliances.component';

describe('ElectronicsAndAppliancesComponent', () => {
  let component: ElectronicsAndAppliancesComponent;
  let fixture: ComponentFixture<ElectronicsAndAppliancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectronicsAndAppliancesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElectronicsAndAppliancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
