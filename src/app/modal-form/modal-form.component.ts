import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';


const states = ['Aer Tank 1 Diffusers', 'Aer Tank 2 Diffusers', 'Aer Tank 3 Diffusers', 'Aer Tank 4 Diffusers', 'Back Flow Preventor, Allard', 'Back Flow Preventor, Bay', 'Back Flow Preventor, Burnham', 'Youlden, Back Flow Preventor', 'Pump Station, Allard', 'Heater, Gleason'];
@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit, AfterViewInit {
  @Input() index;


  form: FormGroup;
  data: any;
  model: any;
  submitted = false;
  btnTxt = 'Submit';

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  // @Output() passEntry: EventEmitter<any> = new EventEmitter();

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cdref: ChangeDetectorRef

  ) {

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

  createControls() {
    this.form = this.formBuilder.group({
      unit: ['', Validators.required],
      style: ['', Validators.required],
      size: ['', Validators.required],
      duty: ['', Validators.required],
      quantity: ['', Validators.required],
      quality: ['', Validators.required],
      load: ['', Validators.required],
      life: ['', Validators.required],
    });
  }

  ngOnInit() {


    this.createControls();
  }

  ngAfterViewInit(): void {
    if (!isNaN(this.index)) {
      this.btnTxt = 'Update';
      this.updateControlValues();
    }
  }

  updateControlValues() {
    const gridData = JSON.parse(localStorage.getItem('data')!);
    const data = gridData[this.index];

    this.form.patchValue({
      unit: data?.unit,
      style: data?.style,
      size: data?.size,
      duty: data?.duty,
      quantity: data?.quantity,
      quality: data?.quality,
      load: data?.load,
      life: data?.life,
    });
    this.cdref.detectChanges();
  }


  passBack() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.form.value.unitTemplateDescripton = 'AERDIF - Aeration, coarse bubble diffused';
    this.form.value.unitTemplateApplication = 'outdoor, submerged, aggressive';
    this.form.value.units = '2500ft2';
    this.form.value.rev = 'Draft';
    this.form.value.avgYear = '';
    this.form.value.year1 = '5075';
    this.form.value.year2 = '75';
    this.form.value.year3 = '75';
    this.form.value.year4 = '75';
    this.form.value.year5 = '605';
    this.form.value.year6 = '75';
    this.form.value.year7 = '75';
    this.form.value.year8 = '75';
    this.form.value.year9 = '605';
    this.form.value.year10 = '75';
    if (!isNaN(this.index)) {
      this.form.value.index = this.index;
    }
    console.log(this.form.value);

    this.activeModal.close(this.form.value);
  }
}
