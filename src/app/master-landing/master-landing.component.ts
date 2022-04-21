import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-landing',
  templateUrl: './master-landing.component.html',
  styleUrls: ['./master-landing.component.scss']
})
export class MasterLandingComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  openPage() {
    this._router.navigate(['admin/landing']);
  }

}
