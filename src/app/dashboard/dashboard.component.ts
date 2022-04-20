import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { FormArray, FormBuilder, FormControl, FormGroup, } from '@angular/forms';
import { TableUtil } from '../tableUtil';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('trRef', { static: true }) trRef: any;
  empForm!: FormGroup;
  providedData: any;
  tableHeaders: any[];
  gridData: any = [];
  sampleData = [
    [
      'AERDIF - Aeration, coarse bubble diffused',
      'outdoor, submerged, aggressive',
      '2500ft',
      'Draft',
      '',
      5057,
      75,
      75,
      75,
      605,
      75,
      75,
      75,
      605,
      75,
    ],
    [
      'BFPALL - Backflow preventer, 2 inch and less',
      'Potable water, outdoor, warm climate',
      'Unit',
      'Draft',
      '',
      255,
      1605,
      105,
      105,
      105,
      255,
      105,
      105,
      105,
      255,
    ]
  ];
  checkIds = [];

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
    // this.gridData.forEach(tr => {
    //   if (tr.length > 9) {
    //     this.tableHeaders.forEach(th => {
    //       th.hidden = true;
    //     })
    //     this.cdref.detectChanges();
    //   }
    // })

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
      this.checkIds = [];
      let cb = document.querySelectorAll('input:checked');
      }
    });
  }

  export() {
    TableUtil.exportTableToExcel("ExampleMaterialTable");
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  calcAll() {

    this.tableHeaders.forEach(element => {
      element.hidden = false;
    })

    this.gridData.forEach(tr => {
      if (tr.length <= 9) {
        let x = (Math.random() > 0.5) ? 1 : 0;
        console.log(x);

        this.sampleData[x].forEach(sample => {
          tr.push(sample);
        });
      }
    })

    localStorage.setItem('data', JSON.stringify(this.gridData));

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

  onChecked(event, id) {
    if (event.target.checked) {
      this.checkIds.push(id);
    } else {
      this.checkIds.splice(id, 1);
    }
    

    // this.checkIds.push(id);
  }

  calcSingle() {
    this.tableHeaders.forEach(element => {
      element.hidden = false;
    });
    this.checkIds.forEach(id => {
      if (this.gridData[id].length > 9) {
        this.gridData[id].splice(9, this.gridData[id].length);
        let x = (Math.random() > 0.5) ? 1 : 0;

        this.sampleData[x].forEach(sample => {
          this.gridData[id].push(sample);
        });
      } else {
        let x = (Math.random() > 0.5) ? 1 : 0;
        this.sampleData[x].forEach(sample => {
          this.gridData[id].push(sample);
        });
      }
    })
  }
}
