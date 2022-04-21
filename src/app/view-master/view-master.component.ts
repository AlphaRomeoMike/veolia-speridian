import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-master',
  templateUrl: './view-master.component.html',
  styleUrls: ['./view-master.component.scss']
})
export class ViewMasterComponent implements OnInit {
  @Input() values;
  constructor(

    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }
  passBack() {
    this.activeModal.close();
  }

}
