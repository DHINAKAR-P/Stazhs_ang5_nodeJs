import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IRole } from '../user-role/IRole';
import { UserService } from '../user.service';
import { Iuser } from '../Iuser';
import { Router, ActivatedRoute } from '@angular/router';
import { IOrganization } from '../../organization/IOrganization';
import { OrganizationService } from '../../organization/organization.service';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  screensForAction = ['Dashboard', 'Orders', 'Purchase Orders', 'Tickets', 'Invoices', 'Shipments', 'Inventory', 'Users'];

  private role: IRole[] = [];
  private usrerole: IRole;
  private users: Iuser = {
    'uuid': '',
    'firstname': '',
    'lastname': '',
    'email': '',
    'rol': '',
    'position': '',
    'userimage': '',
    'username': '',
    'password': '',
    'organization': [],
    'Authorities': []
  };

  private orgUUID = '';
  private allowedScreens = [];
  private duplicateuser = false;
  private organizationlist;
  private adminrole = false;
  private organization: IOrganization = {
    'id': 0,
    'uuid': '',
    'organizationname': '',
    'orgImage': ''
  };
  private assignedRole: {
    role: '',
    uuid: ''
  };
  private update = false;
  private orgid: any;

  constructor(private userService: UserService, private router: Router,
    private route: ActivatedRoute, private organizationService: OrganizationService) {

  }
  private email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  ngOnInit() {
    if (JSON.parse(sessionStorage.getItem('currentUser')).user.organization) {
      this.orgUUID = JSON.parse(sessionStorage.getItem('currentUser')).user.organization.uuid;
    }
    if (JSON.parse(sessionStorage.getItem('currentUser')).user.Authorities[0].role === 'ADMIN') {
      this.adminrole = true;
    }
    if (this.orgUUID) {
      this.getUserRoleList();
    }
    this.getAllOrganization();
    this.route.queryParams.subscribe(params => {
      const uuid = params['uuid'];
      if (uuid !== undefined) {
        this.update = true;
        this.getUserDetails(uuid);
      }
    });
  }

  getAllOrganization() {
    this.organizationService.getAllOrganization().subscribe(
      data => {
        console.log('success to get all organization --- ', data);
        this.organizationlist = data;
      },
      error => {
        console.log('something went wrong');
      }
    );
  }

  organizationchanged() {
    this.getUserRoleList();
  }

  getUserRoleList() {
    this.role = [];
    console.log('-------------', this.orgUUID);
    if (this.orgUUID) {
      this.userService.getAllUserRoleByOrg(this.orgUUID).subscribe(
        data => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].role !== 'ROLE_ADMIN' && data[i].role !== 'ROLE_ORGANIZATION_ADMIN') {
              this.role.push(data[i]);
            }
          }
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.userService.getAllUserRole().subscribe(
        result => {
          for (let j = 0; j < result.length; j++) {
            if (result[j].role === 'ROLE_ORGANIZATION_ADMIN') {
              this.usrerole = (result[j]);
            }
          }
          this.role.push(this.usrerole);
        }
      );
      //       this.userService.getAllUserRole().subscribe(
      //         data => {
      //           for (var i = 0; i < data.length; i++) {
      //             if (data[i].role !== "ROLE_ORGANIZATION_ADMIN") {
      //               this.role.push(data[i]);
      //             }
      //           }
      //           console.log("roles --->",this.role)
      //         },
      //         error => {
      //           console.log(error);
      //         }
      //       );
      // }

    }
  }

  textChanged() {
    this.userService.getUser(this.users.username).subscribe(
      data => {
        if (data === null) {
          this.duplicateuser = false;
        } else {
          this.duplicateuser = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  omit_special_char(event) {
    let k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k === 8 || k === 32);
  }

  emailvalidate() {

  }

  getUserDetails(uuid) {
    this.userService.getUserDetails(uuid).subscribe(
      data => {
        this.users = data;
        this.assignedRole = data.Authorities[0];
      },
      error => {
        console.log(error);
      }
    );
  }

  createUser() {

    if (!this.orgUUID) {
      // tslint:disable-next-line:no-shadowed-variable
      var userDataToSave = {
        'email': this.users.email,
        'username': this.users.username,
        'password': this.users.password,
        'firstname': this.users.firstname,
        'lastname': this.users.lastname,
        'Authorities': [{
          'uuid': this.assignedRole.uuid,
          'role': this.assignedRole.role
        }],
        'organizationUuid': this.organization.uuid
      };
    } else {
      // tslint:disable-next-line:prefer-const
      var userDataToSave = {
        'email': this.users.email,
        'username': this.users.username,
        'password': this.users.password,
        'firstname': this.users.firstname,
        'lastname': this.users.lastname,
        'Authorities': [{
          'uuid': this.assignedRole.uuid,
          'role': this.assignedRole.role
        }],
        'organizationUuid': this.orgUUID
      };
    }

    this.userService.createUser(userDataToSave).subscribe(
      data => {
        this.router.navigate(['/users']);
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  updateUser() {
    if (!this.orgUUID) {
      var userDataToSave = {
        'uuid': this.users.uuid,
        'email': this.users.email,
        'username': this.users.username,
        'password': this.users.password,
        'firstname': this.users.firstname,
        'lastname': this.users.lastname,
        'Authorities': [{
          'uuid': this.assignedRole.uuid,
          'role': this.assignedRole.role
        }],
        'organizationUuid': this.organization.uuid
      };
    } else {
      // tslint:disable-next-line:prefer-const
      var userDataToSave = {
        'uuid': this.users.uuid,
        'email': this.users.email,
        'username': this.users.username,
        'password': this.users.password,
        'firstname': this.users.firstname,
        'lastname': this.users.lastname,
        'Authorities': [{
          'uuid': this.assignedRole.uuid,
          'role': this.assignedRole.role
        }],
        'organizationUuid': this.orgUUID
      };

    }
    console.log('--->> ', userDataToSave);
    this.userService.updateUser(userDataToSave).subscribe(
      data => {
        this.router.navigate(['/users']);
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
