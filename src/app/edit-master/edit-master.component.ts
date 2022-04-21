import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-master',
  templateUrl: './edit-master.component.html',
  styleUrls: ['./edit-master.component.scss']
})
export class EditMasterComponent implements OnInit, AfterViewInit {
  @Input() index;


  form: FormGroup;
  data: any;
  model: any;
  submitted = false;
  btnTxt = 'Submit';

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }


  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cdref: ChangeDetectorRef

  ) {

  }



  createControls() {
    this.form = this.formBuilder.group({
      UnitDesc: ['', Validators.required],
      AppDesc: ['', Validators.required],
      ReplCost: ['', Validators.required],
      Lifemos: ['', Validators.required],
      OHLife: ['', Validators.required],
      Ev1title: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.createControls();
  }

  ngAfterViewInit(): void {
    this.btnTxt = 'Update';
    this.updateControlValues();
  }

  updateControlValues() {
    const gridData = JSON.parse(localStorage.getItem('master')!);
    const data = gridData[this.index];

    this.form.patchValue({
      UnitDesc: data?.UnitDesc,
      AppDesc: data?.AppDesc,
      ReplCost: data?.ReplCost,
      Lifemos: data?.Lifemos,
      OHLife: data?.OHLife,
      Ev1title: data?.Ev1title
    });

    this.cdref.detectChanges();
  }


  passBack() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    if (!isNaN(this.index)) {
      this.form.value.index = this.index;
    }
    console.log(this.form.value);

    this.activeModal.close(this.form.value);
  }
}
