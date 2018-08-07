import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import {ApiService} from '../config/api.service';
import { LoginService } from './login.service';
// import { setTimeout, setInterval } from 'timers';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data: any = {};
  submitted = false;
  spinnerlogo = false;
  errorDiagnostic: String;
  urlDirect:String;
  constructor(private router: Router, private authService: LoginService,private sharedService:SharedService) { }

  ngOnInit() {
    this.urlDirect= sessionStorage.getItem('urlDirect')
    console.log("on login--->",this.urlDirect)
  }

  onSubmit() {
    this.spinnerlogo = true;
    this.submitted = true;
    this.errorDiagnostic = null;
    console.log('User----------->' + this.data.username);
    this.authService.login(this.data.username, this.data.password)
      .delay(1000)
      .subscribe(data => {
        console.log('testing datas in login pages are  ----- ', data);
        sessionStorage.setItem('currentUser', JSON.stringify(data));
        sessionStorage.setItem('token', JSON.stringify(data.token));
        this.spinnerlogo = false;
        if(this.urlDirect!==null){
          window.location.href = this.sharedService.baseUrl+"/"+this.urlDirect;
        }else{this.router.navigate(['/dashboard']);}
        
      },
      error => {
        this.submitted = false;
        setInterval(() => {
          this.spinnerlogo = false;
        }, 1000);
        var i = 0;
        var timer = setInterval(() => {
          this.errorDiagnostic = 'Incorrect username or password.';
          if (i === 10) {
            clearInterval(timer);
            this.spinnerlogo = false;
            this.errorDiagnostic = null;
          }
        }, 500);

      });

  }


}
