import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterLandingComponent } from './master-landing.component';

describe('MasterLandingComponent', () => {
  let component: MasterLandingComponent;
  let fixture: ComponentFixture<MasterLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
