import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { FormArray, FormBuilder, FormControl, FormGroup, } from '@angular/forms';
import { TableUtil } from '../tableUtil';
import { DataListingComponent } from '../data-listing/data-listing.component';
import { ProcessModalComponent } from '../process-modal/process-modal.component';

@Component({
  selector: 'app-dashboard-master',
  templateUrl: './dashboard-master.component.html',
  styleUrls: ['./dashboard-master.component.scss']
})
export class DashboardMasterComponent implements OnInit, AfterViewInit {
  @ViewChild('trRef', { static: true }) trRef: any;
  empForm!: FormGroup;
  providedData: any;
  tableHeaders: any[];
  gridData: any = [];
  checkIds = [];


  constructor(public modalService: NgbModal, private fb: FormBuilder, private cdref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.tableHeaders = [
      {
        text: 'Unit or Equipment Functional Description',
        hidden: false
      },
      {
        text: 'Style',
        hidden: false
      },

      {
        text: 'Size',
        hidden: false
      },
      {
        text: 'Duty/Application',
        hidden: false
      },
      {
        text: 'Quality',
        hidden: false
      },
      {
        text: 'Qty',
        hidden: false
      },
      {
        text: 'Load %',
        hidden: false
      }
    ]
    this.empForm = this.fb.group({
      employees: this.fb.array([])
    });

  }

  ngAfterViewInit(): void {
    this.providedData = JSON.parse(localStorage.getItem('masterdata')!);


    if (this.providedData) {

      this.tableInt();

    }
  }

  tableInt() {
    this.gridData = JSON.parse(localStorage.getItem('masterdata')!);
    this.cdref.detectChanges();
  }
  openModal(index = null) {
    const modalRef = this.modalService.open(ModalFormComponent);
    if (index != null) {
      modalRef.componentInstance.index = index;
    }
    modalRef.result.then((result: any) => {
      if (result) {
        if (!localStorage.getItem('masterdata')) {
          localStorage.setItem('masterdata', JSON.stringify([result]));
          this.gridData = JSON.parse(localStorage.getItem('masterdata')!);

        } else {
          const dataHolder = JSON.parse(localStorage.getItem('masterdata')!);

          if (!isNaN(result?.index)) {
            dataHolder[result.index] = result;
          }
          else {
            dataHolder.push(result);
          }

          localStorage.setItem('masterdata', JSON.stringify(dataHolder));
          this.gridData = JSON.parse(localStorage.getItem('masterdata')!);
        }

      }
    });
  }


  processModel() {
    const modalRef = this.modalService.open(ProcessModalComponent);


    modalRef.result.then((result: any) => {
      if (result) {
        console.log(true);
        this.export();
      }
    });
  }
  export() {
    TableUtil.exportTableToExcel("ExampleMaterialTable");
  }

  employees(): FormArray {
    return this.empForm.get('employees') as FormArray;
  }

  newEmployee(data: any): FormGroup {
    return this.fb.group({
      style: new FormControl(data.style),
      size: new FormControl(data.size),
      quantity: new FormControl(data.quantity),
      duty: new FormControl(data.duty),
      skills: this.fb.array([])
    });

  }

  addEmployee() {
    this.providedData.employees.forEach((element: any, idx: number) => {
      this.employees().push(this.newEmployee(element));
      this.cdref.detectChanges();
      this.addEmployeeSkillLoop(idx);
    })
  }

  removeEmployee(empIndex: number) {
    this.employees().removeAt(empIndex);
  }

  // removeAllEmployee(empIndex: number) {
  //   this.employees().clear();
  // }

  removeAllEmployee(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  employeeSkills(empIndex: number): FormArray {
    return this.employees()
      .at(empIndex)
      .get('skills') as FormArray;
  }

  newSkillLoop(data: any): FormGroup {
    return this.fb.group({
      column: data.column
    });
  }

  newSkill(): FormGroup {
    return this.fb.group({
      column: ''
    });
  }

  addEmployeeSkill(empIndex: number) {

    this.employeeSkills(empIndex).push(this.newSkill());

  }

  addEmployeeSkillLoop(empIndex: number) {

    this.providedData.employees[empIndex]?.skills.forEach((element: any, idx: number) => {
      this.employeeSkills(empIndex).push(this.newSkillLoop(element));
    })
    this.cdref.detectChanges();
  }


  removeEmployeeSkill(empIndex: number, skillIndex: number) {
    this.employeeSkills(empIndex).removeAt(skillIndex);
  }

  onSubmit() {
    console.log(this.empForm.value);
  }

  onUpdate() {
    localStorage.setItem('masterdata', JSON.stringify(this.empForm.value));
  }

  identify(index, item) {
    return index;
  }

  onChecked(event, id) {
    if (event.target.checked) {
      this.checkIds.push(id);
    } else {
      this.checkIds.splice(id, 1);
    }


    // this.checkIds.push(id);
  }

  view(index) {
    const modalRef = this.modalService.open(DataListingComponent);
    modalRef.componentInstance.values = this.gridData[index];
    modalRef.result.then((result: any) => {
      if (result) {
      }
    });
  }


  delete(index: number) {
    this.gridData.splice(index, 1);
    localStorage.setItem('masterdata', JSON.stringify(this.gridData));
  }

  edit(i) {
    this.openModal(i);

  }

  Dulicate(index) {
    const duplicate = this.gridData[index];
    this.gridData.push(duplicate);
    localStorage.setItem('masterdata', JSON.stringify(this.gridData));
  }

}
