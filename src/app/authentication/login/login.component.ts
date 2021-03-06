import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { error } from 'protractor';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: any = {};

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
    localStorage.removeItem("token");
  }

  postLogin() {
    this.authenticationService.login(this.login).subscribe(
      data => {
        this.dataService.setToken(data["access_token"]);
        this.router.navigate(['home', 'dashboard']);
      },
      error => {
        alert(error.error.error_description);
      }
    );
  }

}
