import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-data-listing',
  templateUrl: './data-listing.component.html',
  styleUrls: ['./data-listing.component.scss']
})
export class DataListingComponent implements OnInit {

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  passBack() {
    this.activeModal.close();
  }

}
