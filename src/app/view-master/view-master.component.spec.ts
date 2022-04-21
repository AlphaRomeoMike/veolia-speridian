import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMasterComponent } from './view-master.component';

describe('ViewMasterComponent', () => {
  let component: ViewMasterComponent;
  let fixture: ComponentFixture<ViewMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
