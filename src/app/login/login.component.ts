import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private _router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('admin'),
      password: new FormControl('admin')
    });
  }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.loginForm.value);
    this._router.navigate(['/dashboard']);
  }
}
