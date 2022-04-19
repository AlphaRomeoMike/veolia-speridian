import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { FormControl, FormGroup, } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  constructor(public modalService: NgbModal) { }

  ngOnInit(): void { }

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
}
