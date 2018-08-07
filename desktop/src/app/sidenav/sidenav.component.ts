import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  private userDetails: any;
  private allowedScreensList = '';
  private allowedScreens = [];
  private organizationname: any;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    if (JSON.parse(sessionStorage.getItem('currentUser')).user.organization)
      this.organizationname = JSON.parse(sessionStorage.getItem('currentUser')).user.organization.organizationname;
    this.getCurrentUserDetails();
  }
  getCurrentUserDetails() {
    const json = JSON.parse(sessionStorage.getItem('currentUser'));
    json.user.Authorities[0].role = json.user.Authorities[0].role.toLowerCase();
    this.userDetails = json.user;
    this.allowedScreensList = this.userDetails.Authorities[0].allowedScreens;
    this.allowedScreens = this.allowedScreensList.split(',');
    console.log('sidenav user details are ----- ', this.allowedScreens);
  }

  logout() {
    this.loginService.logout(this.userDetails).subscribe(
      data => {

      },
      error => {

      }
    );
  }
}
