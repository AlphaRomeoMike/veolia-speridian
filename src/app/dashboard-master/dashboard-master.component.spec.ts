import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMasterComponent } from './dashboard-master.component';

describe('DashboardMasterComponent', () => {
  let component: DashboardMasterComponent;
  let fixture: ComponentFixture<DashboardMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
