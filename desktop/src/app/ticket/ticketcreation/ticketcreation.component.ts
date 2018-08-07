import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { OrderService } from '../../orders/orders.service';
import { TicketCreationService } from './ticketcreation.service';
import { Ticket } from './ticket';
import { ticketAttachment } from './ticketattachment';
import { ConfigService } from '../../config/config.service';
import { Constants } from '../../config/Constant';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertDialogComponent } from '../../dialog/alert-dialog/alert-dialog.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';



@Component({
  selector: 'app-ticketcreation',
  templateUrl: './ticketcreation.component.html',
  styleUrls: ['./ticketcreation.component.css']
})
export class TicketcreationComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private mailData: any;
  // selection = new SelectionModel<string>(true, []);

  public uploader: FileUploader = new FileUploader({
    url: '',
    authTokenHeader: '',
    authToken: '',
    isHTML5: true,
  });
  displayedColumns = ['select', 'Number', 'Location', 'PO#', 'Requested', 'Forecasted', 'Tickets', 'Status'];
  dataSource: any = [];
  private listOfOrders: any[] = [];
  private currentUser: any;
  private ticket: Ticket = {
    Type: '',
    description: '',
    Status: '',
    assignedToUuid: '',
    createdByUuid: '',
    organizationUuid: '',
    salesorder: [] = [],
    createdByUser: {},
  };
  private TicketAttachment: ticketAttachment = {
    attachmenturl: [],
    TicketUuid: ''
  };
  private orderid: any;
  private displayAdded;
  private token;
  public success: any;
  public failure: any;
  public successmessage: any;
  public failuremessage: any;
  private selectedTableValue: any[] = [];
  private allOrders: any;
  selection = new SelectionModel(true, []);
  orgUUID: String;
  sthalsOrg: any;

  constructor(private orderService: OrderService, private ticketCreationService: TicketCreationService,
    private config: ConfigService, private spinnerService: Ng4LoadingSpinnerService,
    private router: ActivatedRoute, private route: Router, private dailog: MatDialog) {
    if (JSON.parse(sessionStorage.getItem('currentUser')).user.organization !== null) {
      this.orgUUID = JSON.parse(sessionStorage.getItem('currentUser')).user.organization.uuid;
    }
  }
  ngOnInit() {
    this.getAllOrders();
    this.currentUserDetails();
    this.getquerydetails();
    this.getAllOrg();
    const URL = this.config.api_url + Constants.upload_file;
    this.uploader.onBeforeUploadItem = (item) => {
      item.url = URL + '';
    };
    this.uploader.authTokenHeader = 'Authorization';
    this.uploader.authToken = 'Bearer ' + this.token;
    this.uploader.onCompleteAll = () => {
      this.ticketCreationService.saveFileUrl(this.TicketAttachment).subscribe(
        data => {
          this.success = true;
          this.successmessage = 'New Ticket Created';
          this.initializeVariable();
          console.log('saved ticketAttachmentURL');
          this.spinnerService.hide();
          this.route.navigate(['/ticket']);
        },
        error => {
          this.failure = true;
          this.failuremessage = 'New Ticket has not been Created';
          console.log('cannot save ticket attachmentUrl');
          this.spinnerService.hide();
        }
      );
      this.uploader.queue.length = 0;
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.TicketAttachment.attachmenturl.push(JSON.parse(response));
    };
  }
  initializeVariable() {
    this.ticket.Type = '';
    this.ticket.Status = '';
    this.ticket.salesorder = [];
    this.ticket.description = '';
    this.ticket.createdByUuid = '';
    this.ticket.assignedToUuid = '';
    this.uploader.queue.length = 0;
    this.selection.clear();
  }

  getAllOrg() {
    this.ticketCreationService.orgGetAll().subscribe(

      data => {
        data.forEach(element => {
          if (element.organizationname === 'Stahls') {
            this.sthalsOrg = element;
            console.log('------------sthalsorg-----------', this.sthalsOrg);
          }
        });
      },
      error => {
        console.log(error);
      }
    );

  }

  isSelected(OrderID) {
    let check = false;
    this.selectedTableValue.forEach(element => {
      if (OrderID === element.OrderID) {
        check = true;
      }
    });
    return check;
  }

  getAllOrders() {
    this.orderService.getallOrders().subscribe(
      data => {
        console.log('--------------', this.orderid);
        if (this.orderid !== undefined) {
          data.forEach(element => {
            if (element.OrderID.toString() === this.orderid.toString()) {
              this.selectedTableValue.push(element);
              this.ticket.salesorder.push(element);
            }
          });
        }
        // var result = [];
        // for(var i =0; i < data.length ; i++){
        //   if(data[i].SalesOrderStatus != null){
        //     result.push(data[i])
        //   }
        // }
        // console.log(result.length)
        // if(data.SalesOrderStatus != null){
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'Number': return item.OrderNumber;
            case 'Location': return item.location;
            case 'PO#': return item.PONumber;
            case 'Requested': return item.RequiredDate;
            case 'Forcasted': return item.ForecastFinish;
            case 'Tickets': return item.Tickets;
            case 'Status': return item.StatusName;
            default: return item[property];
          }
        };
        // console.log('---------data----------->', data);
        // }

      },
      error => {
        console.log('something went wrong');
      }
    );
  }
  currentUserDetails() {
    const json = JSON.parse(sessionStorage.getItem('currentUser'));
    this.token = json.token;
    this.currentUser = json.user;
  }
  toggle(row) {
    console.log('row--------->', row);
    let isSameValue = false;
    for (let i = 0; i < this.selectedTableValue.length; i++) {
      if (JSON.stringify(this.selectedTableValue[i]) === JSON.stringify(row)) {
        this.selectedTableValue.splice(i, 1);
        this.ticket.salesorder.splice(i, 1);
        isSameValue = true;
      }
    }
    if (!isSameValue) {
      this.selectedTableValue.push(row);
      this.ticket.salesorder.push(row);
    }
    this.addItems();
  }

  addItems() {
    if (this.selectedTableValue.length > 0) {
      this.displayAdded = true;
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  saveTicket() {
    this.spinnerService.show();
    this.currentUserDetails();
    console.log('--------------orguuid-----------', this.orgUUID);
    if (this.orgUUID !== undefined) {
      this.ticket.organizationUuid = this.orgUUID;
    } else {
      this.ticket.organizationUuid = this.sthalsOrg.uuid;
    }
    this.ticket.assignedToUuid = null;
    this.ticket.createdByUuid = this.currentUser.uuid;
    this.ticket.Status = 'Open';
    this.ticket.createdByUser = this.currentUser;
    this.mailData = this.ticket;
    console.log('-------check-----------', this.ticket);
    this.ticketCreationService.saveTicket(this.ticket).subscribe(
      data => {
        console.log('new ticket----->', this);
        this.mailData.ticket = data;
        this.sendCreateMessage(this.mailData);
        this.getAllOrders();
        this.spinnerService.hide();
        this.ticket.Type = '';
        this.ticket.description = '';
        this.displayAdded = false;
        this.TicketAttachment.TicketUuid = data.uuid;
        console.log('Dialog box Opened..!!');
        this.OpenDialog(data.id);
        // console.log("beforing uploading files are --- ",this.uploader)
        this.uploader.uploadAll();
        this.success = true;

        this.route.navigate(['/ticket']);
      },
      error => {
        this.failure = true;
        console.log('something went wrong');
      }
    );

  }


  OpenDialog(ticketId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '35%';
    dialogConfig.position = {
      bottom: '18%',
    };
    dialogConfig.direction = 'rtl';
    dialogConfig.data = 'A new ticket has been created. The ticket number is : ' + ticketId + ' Please note it for your future reference ';
    const dialogRef = this.dailog.open(AlertDialogComponent, dialogConfig);
  }

  getquerydetails() {
    this.router.queryParams.subscribe(params => {
      this.orderid = params['orderId'];
      if (this.orderid === undefined) {
        this.displayAdded = false;
      } else {
        this.displayAdded = true;
      }
      console.log('-----------cehck--------', this.orderid);
    });
  }

  sendCreateMessage(data) {

    console.log('send mail----------->', data);
    this.ticketCreationService.sendMail(data).subscribe(
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
