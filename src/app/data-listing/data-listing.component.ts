import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-data-listing',
  templateUrl: './data-listing.component.html',
  styleUrls: ['./data-listing.component.scss']
})
export class DataListingComponent implements OnInit {
  @Input() values;
  constructor(

    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }



  passBack() {
    // this.passEntry.emit(this.data);
    this.activeModal.close();
  }

}
