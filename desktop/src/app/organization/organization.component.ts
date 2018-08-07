import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { IOrganization } from './IOrganization';
import { OrganizationService } from './organization.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DeleteDialogComponent } from '../dialog/delete-dialog/delete-dialog.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlertDialogComponent } from '../dialog/alert-dialog/alert-dialog.component';



@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.spinnerservice.show();
    this.dataSource.sort = this.sort;
    this.getAllOrganization();
  }
  // tslint:disable-next-line:member-ordering
  private listOfOrganization: IOrganization[] = [];
  // tslint:disable-next-line:member-ordering
  private testArray: any[];

  // tslint:disable-next-line:member-ordering
  displayedColumns = ['Id', 'Organization', 'Actions'];

  // tslint:disable-next-line:member-ordering
  dataSource = new MatTableDataSource(this.listOfOrganization);

  // tslint:disable-next-line:max-line-length
  constructor(private spinnerservice: Ng4LoadingSpinnerService, private organizationService: OrganizationService, private router: Router, private route: ActivatedRoute, private dailog: MatDialog) { }

  adduser() {
    this.router.navigate(['/new-user']);
  }
  Updateorganization(row) {
    this.router.navigate(['/create-org'], { queryParams: { id: row.uuid } });
  }

  getAllOrganization() {
    this.organizationService.getAllOrganization().subscribe(
      data => {
        console.log('success to get all organization --- ', data);
        if (data === 'There is no Organisation') {
          this.Popup();
          this.listOfOrganization = [];
          this.dataSource = new MatTableDataSource(this.listOfOrganization);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.spinnerservice.hide();
        } else {
          this.listOfOrganization = data;
          this.testArray = this.listOfOrganization;
          this.dataSource = new MatTableDataSource(this.testArray);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
              case 'id': return item.id;
              case 'Organization': return item.organizationname.toLowerCase();
              default: return item[property];
            }
          };
          this.spinnerservice.hide();
        }
      },
      error => {
        console.log('something went wrong');
      }
    );
  }
  Popup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '35%';
    dialogConfig.position = {
      bottom: '18%',
    };
    dialogConfig.direction = 'rtl';
    dialogConfig.data = 'No Data in Organization';
    const dialogRef = this.dailog.open(AlertDialogComponent, dialogConfig);
  }

  Opendialog(row) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '35%';
    dialogConfig.position = {
      bottom: '18%',
    };
    dialogConfig.direction = 'rtl';
    dialogConfig.data = row;
    const dialogRef = this.dailog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      val => {
        if (val !== undefined) {
          this.deleteorganization(val);
        }
      }
    );

  }

  deleteorganization(row) {
    this.organizationService.deleteOrganization(row.uuid).subscribe(data => { }, error => {
      console.log('-----error------');
    });
    this.getAllOrganization();
  }
}
