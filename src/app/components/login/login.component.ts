import { Component, OnInit } from '@angular/core';
import {AuthenticationServiceService} from "../../services/authentication-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService:AuthenticationServiceService,
              private router:Router) { }

  ngOnInit(): void {
  }


  onLogin(dataForm:any) {
    this.authenticationService.login(dataForm.username,dataForm.password)
    if(this.authenticationService.isAuthenticated)
    {
      this.authenticationService.saveAuthencatedUser();
      this.router.navigateByUrl("");
    }
  }
}
