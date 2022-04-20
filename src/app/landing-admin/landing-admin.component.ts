import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-admin',
  templateUrl: './landing-admin.component.html',
  styleUrls: ['./landing-admin.component.scss']
})
export class LandingAdminComponent implements OnInit {
  active = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
