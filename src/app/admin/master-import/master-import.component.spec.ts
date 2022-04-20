import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterImportComponent } from './master-import.component';

describe('MasterImportComponent', () => {
  let component: MasterImportComponent;
  let fixture: ComponentFixture<MasterImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
