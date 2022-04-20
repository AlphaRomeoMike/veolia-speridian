import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { FormArray, FormBuilder, FormControl, FormGroup, } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  empForm!: FormGroup;
  providedData: any;
  tableHeaders: any[];
  gridData: any = [];

  constructor(public modalService: NgbModal, private fb: FormBuilder, private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.tableHeaders = [
      {
        text: 'Unit or Equipment Functional Description',
        hidden: false
      },
      {
        text: 'Asset Type',
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
      },
      {
        text: 'Life %',
        hidden: false
      },
      {
        text: 'Life %',
        hidden: false
      },
      {
        text: 'Unit Template Descripton',
        hidden: true
      },
      {
        text: 'Unit Template Application',
        hidden: true
      },
      {
        text: 'Units',
        hidden: true
      },
      {
        text: 'Rev.',
        hidden: true
      },
      {
        text: 'LAvg. Year',
        hidden: true
      },
      {
        text: 'Year 1',
        hidden: true
      },
      {
        text: 'Year 2',
        hidden: true
      },
      {
        text: 'Year 3',
        hidden: true
      },
      {
        text: 'Year 4',
        hidden: true
      },
      {
        text: 'Year 5',
        hidden: true
      },
      {
        text: 'Year 6',
        hidden: true
      },
      {
        text: 'Year 7',
        hidden: true
      },
      {
        text: 'Year 8',
        hidden: true
      },
      {
        text: 'Year 9',
        hidden: true
      },
      {
        text: 'Year 10',
        hidden: true
      }
    ]
    this.empForm = this.fb.group({
      employees: this.fb.array([])
    });

  }

  ngAfterViewInit(): void {
    this.providedData = JSON.parse(localStorage.getItem('data')!);
    console.log(this.providedData);

    if (this.providedData) {
      this.tableInt();
      // this.addEmployee();
    }
  }

  tableInt() {
    this.gridData = JSON.parse(localStorage.getItem('data')!);
    // this.providedData.forEach(item => {
    //   // let holdData = [];
    //   Object.keys(item).forEach(key => {
    //     // holdData.push(item[key]);
    //     this.gridData.push({ text: item[key] });
    //   });

    //   // holdData.map(x => this.gridData.push({ text: x }))
    //   // this.gridData.push(holdData.flat());
    // });
    this.cdref.detectChanges();

    // debugger
    // this.dataTable = this.providedData;
  }

  openModal() {
    const modalRef = this.modalService.open(ModalFormComponent);
    modalRef.result.then((result: any) => {
      if (result) {

        // this.removeAllEmployee(this.employees());
        if (!localStorage.getItem('data')) {
          // result.skills = []
          // const dataArray = { employees: [result] };

          const data = this.objIteration(result);
          // dataArray.employees.push(result.skills = []);
          localStorage.setItem('data', JSON.stringify(data));
          this.providedData = JSON.parse(localStorage.getItem('data')!);

          // this.addEmployee();
          // this.tableInt();
        } else { 
          const dataHolder = JSON.parse(localStorage.getItem('data')!);
          // result.skills = [];
          const data = this.objIteration(result);
          dataHolder.push(...data);
          localStorage.setItem('data', JSON.stringify(dataHolder));
          this.providedData = JSON.parse(localStorage.getItem('data')!);
          // this.addEmployee()
          // this.tableInt();

        }
      }
    });
  }

  objIteration(data): any {

    let tableTr = [];
    let tableTd = [];
    Object.keys(data).forEach(key => {
      // holdData.push(item[key]);
      tableTd.push(data[key]);
    });

    tableTr.push(tableTd);
    this.gridData.push(tableTd);
    return tableTr;
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
    // this.providedData.employees[empIndex]?.skills.forEach((element: any, idx: number) => {
    //   this.employeeSkills(empIndex).push(this.newSkill(element));
    // })
    // this.cdref.detectChanges();
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
    localStorage.setItem('data', JSON.stringify(this.empForm.value));
  }

  identify(index, item) {
    return index;
  }
}
