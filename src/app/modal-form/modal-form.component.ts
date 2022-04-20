import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';


const states = ['Aer Tank 1 Diffusers', 'Aer Tank 2 Diffusers', 'Aer Tank 3 Diffusers', 'Aer Tank 4 Diffusers','Back Flow Preventor, Allard', 'Back Flow Preventor, Bay', 'Back Flow Preventor, Burnham', 'Youlden, Back Flow Preventor', 'Pump Station, Allard', 'Heater, Gleason'];
@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {
  form: FormGroup;
  data: any;
  model: any;

  // @Output() passEntry: EventEmitter<any> = new EventEmitter();

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(
    public activeModal: NgbActiveModal
  ) {
    this.form = new FormGroup({
      style: new FormControl(''),
      size: new FormControl(''),
      duty: new FormControl(''),
      quantity: new FormControl(''),
      quality: new FormControl(''),
      unit: new FormControl(''),
      load: new FormControl(''),
      life: new FormControl(''),
    })
  }


  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? states
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  ngOnInit() {
  }

  passBack() {
    // this.passEntry.emit(this.data);
    this.activeModal.close(this.form.value);
  }
}
