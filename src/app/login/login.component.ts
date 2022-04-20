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
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.loginForm.controls['email'].value === 'admin' && this.loginForm.controls['password'].value === 'admin') {
      this.router.navigate(['/admin/landing']);
    }
    else {
      this.router.navigate(['/landing']);
    }

  }
}
