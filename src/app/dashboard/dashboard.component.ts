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

  constructor(public modalService: NgbModal, private fb: FormBuilder, private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.empForm = this.fb.group({
      employees: this.fb.array([])
    });
    
   }

   ngAfterViewInit(): void {
    this.providedData = JSON.parse(localStorage.getItem('data')!);
    console.log(this.providedData);

    if (this.providedData) {
      this.addEmployee();
    }
   }

  openModal() {
    const modalRef = this.modalService.open(ModalFormComponent);
    modalRef.result.then((result: any) => {
      if (result) {
        if (!localStorage.getItem('data')) {
          const dataArray = {employees: []};
          
          dataArray.employees.push(result);
          localStorage.setItem('data', JSON.stringify(dataArray));
          this.addEmployee();
        } else {
          const dataHolder = JSON.parse(localStorage.getItem('data')!);
          dataHolder.employees.push(result);
          localStorage.setItem('data', JSON.stringify(dataHolder));
          this.addEmployee()
        }
      }
    });
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
    this.providedData.employees.forEach((element : any, idx: number) => {
      this.employees().push(this.newEmployee(element));
      this.cdref.detectChanges();
      this.addEmployeeSkill(idx);

    })
  }

  removeEmployee(empIndex: number) {
    this.employees().removeAt(empIndex);
  }

  employeeSkills(empIndex: number): FormArray {
    return this.employees()
      .at(empIndex)
      .get('skills') as FormArray;
  }

  newSkill(data: any): FormGroup {
    return this.fb.group({
      column: data.column
    });
  }

  addEmployeeSkill(empIndex: number) {
    // if (!this.providedData.employees[empIndex].skills) {
    //   return;
    // }
    
    this.providedData.employees[empIndex]?.skills.forEach((element: any, idx: number) => {
      this.employeeSkills(empIndex).push(this.newSkill(element));
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
}
