import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-process-modal',
  templateUrl: './process-modal.component.html',
  styleUrls: ['./process-modal.component.scss']
})
export class ProcessModalComponent implements OnInit {

  showLoader = true;
  constructor(
    public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.showLoader = false
    }, 3000);
  }

  passBack() {
    this.activeModal.close(true);
  }
}
