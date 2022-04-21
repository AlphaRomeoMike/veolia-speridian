import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMasterComponent } from './edit-master.component';

describe('EditMasterComponent', () => {
  let component: EditMasterComponent;
  let fixture: ComponentFixture<EditMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
