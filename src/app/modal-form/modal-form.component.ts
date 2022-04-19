import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {
  form: FormGroup;
  data: any;
  // @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal
  ) {
    this.form = new FormGroup({
      style: new FormControl(''),
      size: new FormControl(''),
      duty: new FormControl(''),
      quantity: new FormControl(''),
    })
  }

  ngOnInit() {
  }

  passBack() {
    // this.passEntry.emit(this.data);
    this.activeModal.close(this.form.value);
  }
}
