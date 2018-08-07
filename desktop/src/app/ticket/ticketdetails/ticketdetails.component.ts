import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { IOrders } from '../../orders/IOrder';
import { OrderService } from '../../orders/orders.service';
import { TicketDetailService } from './ticketdetails.service';
import { Observable } from 'rxjs/Observable';
import { setTimeout } from 'timers-browserify';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { FormControl } from '@angular/forms';
import * as JSZip from 'jszip';
import * as JSZipUtils from 'jszip-utils';
import * as FileSaver from 'file-saver';



@Component({
  selector: 'app-ticketdetails',
  templateUrl: './ticketdetails.component.html',
  styleUrls: ['./ticketdetails.component.css']
})
export class TicketdetailsComponent implements OnInit {

  @ViewChild('closeTicket')
  closeTicketModel: ModalComponent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // private ticketDetails: {
  //   createByImg: string,
  //   assignToImg: string
  // };
  private ticketDetails: any;
  private listOfOrders: IOrders[] = [];
  private showDetails: boolean;
  private orgUUID;
  public selectedValues = new FormControl();
  private userUUID;
  private closedMessage: any[];
  private allUser = [];
  private userToDisplay = [];
  allOrganization: any[] = [];
  myOrganization: any[] = [];
  private Reason: any[] = [];
  private Reason1: any;
  organizationname: String;
  private test: any;
  private selected: any[];
  private assignedUserList: any[] = [];
  private salesorder: any;
  private ticketcount: any;

  displayedColumns = ['Number', 'Location', 'PO#', 'Requested', 'Forecasted', 'Tickets', 'Status'];
  private dataSource: any = [];
  constructor(private orderService: OrderService, private router: Router, private ticketDetailService: TicketDetailService,
    private route: ActivatedRoute, private sharedService: SharedService) {

    if (JSON.parse(sessionStorage.getItem('currentUser')) === null) {
      console.log('url-------->', this.router.url);
      sessionStorage.setItem('urlDirect', this.router.url);
      this.router.navigate(['']);
    }
    if (JSON.parse(sessionStorage.getItem('currentUser')).user.organization !== null) {
      this.orgUUID = JSON.parse(sessionStorage.getItem('currentUser')).user.organization.uuid;
      this.organizationname = JSON.parse(sessionStorage.getItem('currentUser')).user.organization.organizationname;
    }

  }

  ngOnInit() {
    this.showDetails = false;
    this.getQueryDetails();
    this.getAllOrganization();
    this.getAllOrganizationUser();
    this.getclosereason();
  }

  getAllOrganizationUser() {
    this.ticketDetailService.getAllUser().subscribe(

      data => {
        // this.UsersList = data;
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          if (data[i].Authorities[0].role !== 'ADMIN') {
            this.allUser.push(data[i]);
          }
        }
        // this.dataSource = new MatTableDataSource(this.UsersList);
      },
      error => {
        console.log(error);
      }
    );
  }

  getAllOrganization() {

    if (this.organizationname === 'Stahls') {

      this.ticketDetailService.orgGetAll().subscribe(

        data => {
          // this.UsersList = data;
          console.log('org------> ', data);
          this.allOrganization = data;
          // this.dataSource = new MatTableDataSource(this.UsersList);
        },
        error => {
          console.log(error);
        }
      );

    }
    if (this.organizationname === undefined) {
      this.ticketDetailService.orgGetAll().subscribe(

        data => {
          this.myOrganization = data;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.allOrganization = ['Stahls', this.organizationname];
      this.ticketDetailService.orgGetAll().subscribe(

        data => {
          console.log('org------> ', data);
          data.forEach(element => {
            if (element.organizationname === 'Stahls') {
              this.myOrganization.push(element);
            }
            if (element.organizationname === this.organizationname) {
              this.myOrganization.push(element);
            }

          });
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  getQueryDetails() {

    this.route.queryParams.subscribe(params => {
      const uuid = params['uuid'];
      this.getTicketByUuid(uuid);
    });
  }

  filterOrg(data) {
    this.userToDisplay = [];
    for (let i = 0; i < this.allUser.length; i++) {
      if (this.allUser[i].organization !== null && this.allUser[i].organization !== '') {
        if (this.allUser[i].organization.uuid === data.uuid) {
          this.userToDisplay.push(this.allUser[i]);
        }
      }
    }

    console.log('all the user ------- ', this.userToDisplay);
    // this.userToDisplay = Array.from(new Set(this.userToDisplay.map((itemInArray) => itemInArray.firstname)));
    // this.filter_ticketStatus = Array.from(new Set(this.listOfTickets.map((customerArray => customerArray.Status))));
  }

  // assignedTicket to user for each api call
  // assignTicket(data) {
  //   console.log('testing list of data @#@#@#@# ', data, this.ticketDetails);
  //   const Object = {
  //     ticketUuid: this.ticketDetails,
  //     assignedUsers: data.value
  //   };
  //   this.ticketDetailService.createAssignedUserTicket(Object).subscribe(
  //     // tslint:disable-next-line:no-shadowed-variable
  //     data => {
  //       console.log('assigned to success');
  //     },
  //     error => {
  //       console.log('assigned to failure');

  //     }
  //   );
  // }


  // assignTicket(data) {
  //   console.log('testing list of data @#@#@#@# ', data, this.ticketDetails, data.value.length);
  //   // data.value.array.forEach(element => {
  //   //   console.log('assigned ticket for each iterate ');
  //   //   if (this.assignedUserList.indexOf(element.uuid) > -1) {
  //   //     this.assignedUserList.splice(this.assignedUserList.indexOf(element.uuid), 1);
  //   //   } else {
  //   //     this.assignedUserList.push(element.uuid);
  //   //   }
  //   // });
  //   // for (let i = 0; i < data.value.length; i++) {
  //   //   console.log('#$@#$##$$ inside for loop ------ ' i, this.assignedUserList, data.value[i].uuid);
  //   //   if (this.assignedUserList.indexOf(data.value[i].uuid) > -1) {
  //   //     console.log('entering into if condition');
  //   //     this.assignedUserList.splice(this.assignedUserList.indexOf(data.value[i].uuid), 1);
  //   //   } else {
  //   //     console.log('entering into else condition');

  //   //     this.assignedUserList.push(data.value[i].uuid);
  //   //   }
  //   // }
  // }

  saveAssignedUserTicket() {
    console.log('final values are ------ ', this.assignedUserList, this.selectedValues, this.ticketDetails);
    const Object = {
      ticketUuid: this.ticketDetails.uuid,
      assignedUsers: this.selectedValues.value
    };
    this.ticketDetailService.createAssignedUserTicket(Object).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      data => {
        this.selected = [];
        this.ticketDetails.Status = 'Assigned';
        this.ticketDetailService.update_Ticket(this.ticketDetails).subscribe(
          // tslint:disable-next-line:no-shadowed-variable
          data => {
            console.log('assign ticket--------->', data);
            this.sendMessage();
            this.router.navigate(['/ticket']);
          },
          error => {
            console.log('something went wrong');
          }
        );
        // this.getTicketByUuid(this.ticketDetails.uuid);
        // this.router.navigate(['/ticket']);
      },
      error => {
        console.log('something went wrong');

      }
    );
  }

  sendMessage() {

    this.ticketDetailService.getTicketByUuid(this.ticketDetails.uuid).subscribe(
      data => {
        this.ticketDetails = data;
        console.log('data----------->', data);
        this.ticketDetailService.sendMail(data).subscribe(
          // tslint:disable-next-line:no-shadowed-variable
          data => {
            console.log('mail sent-------------->');
          });
      },
      error => {
        console.log('something went wrong');
      }
    );

  }

  getTicketByUuid(uuid) {
    this.ticketcount = 0;
    this.ticketDetailService.getTicketByUuid(uuid).subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data.salesorder);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log('get ticket by uuid are ----- ', data);
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'Number': return item.OrderNumber;
            case 'Location': return item.CompanyCode.toLowerCase();
            case 'PO#': return item.PONumber;
            case 'Date': return item.OrderDate;
            case 'Requested': return item.RequiredDate;
            case 'Forecasted': return item.ForecastFinish;
            case 'Tickets': return item.Tickets;
            case 'Status': return item.StatusName.toLowerCase();
            default: return item[property];
          }
        };
        this.ticketDetails = data;
        this.salesorder = this.ticketDetails.salesorder;
        if (this.salesorder.TicketUuid !== '') {
          this.ticketcount = this.ticketcount + 1;
        }
        // this.ticketDetails.createByImg = 'assets/img/male-icon.png';
        // this.ticketDetails.assignToImg = 'assets/img/male-icon.png';
      },
      error => {
        console.log('something went wrong');
      }
    );
  }

  // zipped one or more than one files and downloaded using JSZip
  download() {
    console.log('downloading files');
    const zip = new JSZip();
    let count = 0;
    const nombre = 'newFile';
    const name = nombre + '.zip';
    const urls = [];
    this.ticketDetails.attachments.forEach(element => {
      urls.push(element.attachmenturl);
    });
    const img = zip.folder('Data');
    const ticketLength = this.ticketDetails.attachments.length;
    this.ticketDetails.attachments.forEach(element => {
      const fullUrl = this.sharedService.baseUrl + '/' + element.attachmenturl;
      JSZipUtils.getBinaryContent(fullUrl, function (err, data) {
        if (err) {
        }
        img.file(element.filename, data, { binary: true });
        count++;
        if (count === ticketLength) {
          zip.generateAsync({ type: 'blob' }).then(function (content) {
            FileSaver.saveAs(content, name);
          });
        }
      });
    });
  }

  openCloseTicketModal() {
    this.closeTicketModel.open();
  }

  getclosereason() {
    // tslint:disable-next-line:prefer-const
    let dataToUpdate = this.ticketDetails;
    this.ticketDetailService.getReason().subscribe(data1 => {
      this.Reason = data1;

    }, error => { });

  }

  closeTicketOption() {
    const dataToUpdate = this.ticketDetails;
    dataToUpdate.closingRemarks = this.closedMessage;
    dataToUpdate.CloseReasonUuid = dataToUpdate.closingRemarks.uuid;
    dataToUpdate.Status = 'Closed';
    this.ticketDetailService.update_Ticket(dataToUpdate).subscribe(
      data => {
        this.test = data;
        // this.closedMessage = "";
        this.sendCloseMessage(dataToUpdate);
        this.closeTicketModel.close();
        this.router.navigate(['/ticket']);
        // this.getTicketByUuid(dataToUpdate.uuid);
      },
      error => {
      }
    );
  }

  sendCloseMessage(data) {

    this.ticketDetailService.sendMail(data).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      data => {
        console.log('mail sent-------------->');
      },
      error => {
        console.log('something went wrong');
      }
    );

  }

}
