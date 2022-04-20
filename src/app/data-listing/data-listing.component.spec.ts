import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataListingComponent } from './data-listing.component';

describe('DataListingComponent', () => {
  let component: DataListingComponent;
  let fixture: ComponentFixture<DataListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
