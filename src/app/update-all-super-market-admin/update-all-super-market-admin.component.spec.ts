import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAllSuperMarketAdminComponent } from './update-all-super-market-admin.component';

describe('UpdateAllSuperMarketAdminComponent', () => {
  let component: UpdateAllSuperMarketAdminComponent;
  let fixture: ComponentFixture<UpdateAllSuperMarketAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAllSuperMarketAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateAllSuperMarketAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
