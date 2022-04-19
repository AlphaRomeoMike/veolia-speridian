import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { FormArray, FormBuilder, FormControl, FormGroup, } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  empForm!: FormGroup;

  constructor(public modalService: NgbModal, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.empForm = this.fb.group({
      employees: this.fb.array([])
    });
   }

  openModal() {
    const modalRef = this.modalService.open(ModalFormComponent);
    modalRef.result.then((result) => {
      if (result) {
        if (!localStorage.getItem('data')) {
          const dataArray = new Array<any>();
          dataArray.push(result);
          localStorage.setItem('data', JSON.stringify(dataArray));
        } else {
          const dataHolder = JSON.parse(localStorage.getItem('data')!);
          dataHolder.push(result);
          localStorage.setItem('data', JSON.stringify(dataHolder));
        }
      }
    });
  }
  
  employees(): FormArray {
    return this.empForm.get('employees') as FormArray;
  }

  newEmployee(): FormGroup {
    return this.fb.group({
      firstName: '',
      lastName: '',
      skills: this.fb.array([])
    });
  }

  addEmployee() {
    this.employees().push(this.newEmployee());
  }

  removeEmployee(empIndex: number) {
    this.employees().removeAt(empIndex);
  }

  employeeSkills(empIndex: number): FormArray {
    return this.employees()
      .at(empIndex)
      .get('skills') as FormArray;
  }

  newSkill(): FormGroup {
    return this.fb.group({
      skill: '',
      exp: ''
    });
  }

  addEmployeeSkill(empIndex: number) {
    this.employeeSkills(empIndex).push(this.newSkill());
  }

  removeEmployeeSkill(empIndex: number, skillIndex: number) {
    this.employeeSkills(empIndex).removeAt(skillIndex);
  }

  onSubmit() {
    console.log(this.empForm.value);
  }
}
