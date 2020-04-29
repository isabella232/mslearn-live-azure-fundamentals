import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataClient } from '../services/data-client';
import { UserAuthManager } from '../services/UserAuthManager';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  loginForm;
  formBuilder: FormBuilder;
  public data: DataClient;
  public usrMgr: UserAuthManager;

  constructor(formBuilder: FormBuilder, data: DataClient, usrMgr: UserAuthManager, private router: Router) {
    this.formBuilder = formBuilder;
    this.data = data;
    this.usrMgr = usrMgr;

    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  onSubmit(action: string, loginData) {
    let email = loginData.email;
    let password = loginData.password;

    if (action == "login")
    {
      this.data.LoginUser(email, password, this.usrMgr, () => {
        this.router.navigateByUrl("products");
      });
    } else if (action == "register")
    {
      this.data.RegisterUser(email, password, this.usrMgr, () => {
        this.router.navigateByUrl("products");
      });
    }
  }

  ngOnInit(): void {

  }
}
