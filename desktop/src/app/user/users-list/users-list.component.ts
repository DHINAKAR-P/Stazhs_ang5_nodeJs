import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { Iuser } from '../Iuser';
import { UserService } from '../user.service';
import { DeleteDialogComponent } from '../../dialog/delete-dialog/delete-dialog.component';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlertDialogComponent } from '../../dialog/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})


export class UsersListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private UsersList: Iuser[] = [];
  private IUsers: Iuser = {
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

  private filter_Organization: any = [];
  private filter_Role: any = [];
  private selectedValue: any[];
  private filterArr: any[];
  selectfilter = new FormControl();
  private orgUUID;
  displayedColumns = ['Name', 'Lastname', 'Email', 'Rol', 'Organisation', 'Actions'];
  dataSource: any = [];
  constructor(private spinnerservice: Ng4LoadingSpinnerService, private userService: UserService,
    private dialog: MatDialog, private router: Router) {
    if (JSON.parse(sessionStorage.getItem('currentUser')).user.organization) {
      this.orgUUID = JSON.parse(sessionStorage.getItem('currentUser')).user.organization.uuid;
    }
  }

  ngOnInit() {
    this.spinnerservice.show();
    this.getUserList();
  }

  getUserList() {
    if (this.orgUUID) {
      this.userService.getAllUserByOrg(this.orgUUID).subscribe(

        data => {
          // this.UsersList = data;
          // this.spinnerservice.hide();
          if (data === null || data.length === 0) {
            this.UsersList = [];
            this.spinnerservice.hide();
            this.popupForNoData();
          } else {
            this.UsersList = data;
            this.spinnerservice.hide();
          }
          console.log(this.UsersList);
          this.dataSource = new MatTableDataSource(this.UsersList);
          this.sortPage();
          this.UsersList.forEach(element => {
            if (element.organization !== null) {
              this.filter_Organization.push(element.organization.organizationname);
            }
          });
          this.filter_Organization = Array.from(new Set(this.filter_Organization.map((itemInArray) => itemInArray)));

          this.UsersList.forEach(element => {
            if (element.Authorities !== null) {
              this.filter_Role.push(element.Authorities[0].role);
            }
          });
          this.filter_Role = Array.from(new Set(this.filter_Role.map((itemInArray) => itemInArray)));

        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.userService.getAllUser().subscribe(
        data => {
          // this.UsersList = data;
          if (data === null || data.length === 0) {
            this.UsersList = [];
            this.spinnerservice.hide();
            this.popupForNoData();
          } else {
            this.UsersList = data;
            this.spinnerservice.hide();
          }
          console.log('user list data-------->', this.UsersList);
          this.dataSource = new MatTableDataSource(this.UsersList);
         this.sortPage();
          this.UsersList.forEach(element => {
            if (element.organization !== null) {
              this.filter_Organization.push(element.organization.organizationname);
            }
          });
          this.filter_Organization = Array.from(new Set(this.filter_Organization.map((itemInArray) => itemInArray)));

          this.UsersList.forEach(element => {
            if (element.Authorities !== null) {
              this.filter_Role.push(element.Authorities[0].role);
            }
          });
          this.filter_Role = Array.from(new Set(this.filter_Role.map((itemInArray) => itemInArray)));
          // this.sortPage();
          // this.dataSource.sortingDataAccessor = (item, property) => {
          //   switch (property) {
          //     case 'Name': return item.firstname;
          //     case 'Lastname': return item.lastname;
          //     case 'Email': return item.email;
          //     case 'Organisation': return item.organization.organizationname;
          //     case 'Rol': return item.Authorities[0].role;
          //     default: return item[property];
          //   }
          // };
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  ngAfterViewInit() {
  }

  popupForNoData() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '35%';
    dialogConfig.position = {
      bottom: '18%',
    };
    dialogConfig.direction = 'rtl';
    dialogConfig.data = 'No Data in User';
    const dialogRef = this.dialog.open(AlertDialogComponent, dialogConfig);
  }

  openDialog(userData) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = userData;

    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      val => {
        if (val !== undefined) {
          this.handleUserDisable(val);
        }
      }
    );
  }

  handleUserDisable(userData) {
    this.userService.disableUser(userData.uuid).subscribe(
      data => {
        this.getUserList();
      },
      error => {
        console.log(error);
      }
    );
  }


  OrgFilter() {
    this.selectedValue = [];
    this.filterArr = [];
    console.log('before filtering values are ---- ', this.selectfilter);
    this.selectedValue = this.selectfilter.value;

    if (this.selectedValue.length === 0) {
      this.getUserList();
    } else {
      this.selectedValue.forEach(element => {

        this.UsersList.forEach(one => {

          if (one.organization !== null) {
            if (one.organization.organizationname === element) {
              this.filterArr.push(one);
            }
          }
          const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
          this.dataSource = new MatTableDataSource(filterdata);
          this.sortPage();
        });

      });
    }

  }

  RoleFilter() {
    this.selectedValue = [];
    this.filterArr = [];
    console.log('before filtering values are ---- ', this.selectfilter);
    this.selectedValue = this.selectfilter.value;

    if (this.selectedValue.length === 0) {
      this.initializeValue();
    } else {
      this.selectedValue.forEach(element => {

        this.UsersList.forEach(one => {

          if (one.Authorities[0] !== null) {
            if (one.Authorities[0].role === element) {
              this.filterArr.push(one);
            }
          }
          const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
          this.dataSource = new MatTableDataSource(filterdata);
        this.sortPage();
        });

      });
    }

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  initializeValue() {
    this.dataSource = new MatTableDataSource(this.UsersList);
   this.sortPage();
  }

  sortPage() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'Name': return item.firstname.toLowerCase();
        case 'Lastname': return item.lastname.toLowerCase();
        case 'Email': return item.email;
        case 'Rol': return item.Authorities[0].role;
        case 'Organisation': {
          if (item.organization === null) {
            return item.organization;
          } else {
            return item.organization.organizationname;
          }
        }
        default: return item[property];
      }
    };
  }

  handleUserEdit(userData) {
    this.router.navigate(['/new-user'], { queryParams: { uuid: userData.uuid } });
  }
}
