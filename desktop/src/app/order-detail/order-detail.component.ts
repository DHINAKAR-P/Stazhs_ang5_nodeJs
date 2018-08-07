import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOrderDetail } from './IOrderDetail';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';

import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { OrderDetailService } from './order-detail.service';
import { forEach } from '@angular/router/src/utils/collection';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';




@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrderDetailComponent implements OnInit, AfterViewInit {
  isLinear = true;

  private IOrders: IOrderDetail = {
    uuid: '',
    item: 0,
    style: '',
    color: '',
    quantity: 0,
    price: '',
    shippingmethod: '',
    artworkstatus: ''
  };

  Order: any;

  listOrderDetail: IOrderDetail[] = [];

  private orderdetail: any[] = [];

  private detail: any[] = [];

  private showDetails: any;

  private ticket: any;

  private user: any;

  private ticketlength: any;

  private ticketstatus: any;

  private Openticket: any;

  private Closeticket: any;

  private inprogress: any;

  private ticketdate: any;

  private tstatus: any[] = [];

  private saleorderstatus: any[] = [];

  private salesoderdetails: any;

  private salesitems: any[] = [];

  private showStepper: boolean;

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');

  // tslint:disable-next-line:member-ordering
  expandedElement: any;
  // tslint:disable-next-line:member-ordering
  displayedColumns = ['Item', 'Style', 'Color', 'style_option', 'Quantity', 'Price', 'ShippingMethod', 'ArtworkStatus'];
  // tslint:disable-next-line:member-ordering
  dataSource: any = [];
  // tslint:disable-next-line:member-ordering
  @ViewChild(MatSort) sort: MatSort;
  // tslint:disable-next-line:member-ordering
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // tslint:disable-next-line:member-ordering
  private artwork_status = [];
  // tslint:disable-next-line:member-ordering
  private status: any;
  // tslint:disable-next-line:member-ordering
  private active: any;
  // tslint:disable-next-line:member-ordering
  private shipped: any;
  // tslint:disable-next-line:member-ordering
  private void: any;
  // tslint:disable-next-line:member-ordering
  private delayed: any;
  // tslint:disable-next-line:member-ordering
  private activeorder: any;
  // tslint:disable-next-line:member-ordering
  private voidorder: any;
  // tslint:disable-next-line:member-ordering
  private Delayedorder: any;
  // tslint:disable-next-line:member-ordering
  private Shippedorder: any;
  // tslint:disable-next-line:member-ordering
  private orderstatus: any;
  // tslint:disable-next-line:member-ordering
  private test: any;
  // tslint:disable-next-line:member-ordering
  private createdby: any;
  // tslint:disable-next-line:member-ordering
  private test1 = { StatusName: 'Released' };
  // tslint:disable-next-line:max-line-length
  // tslint:disable-next-line:member-ordering
  private ticketcount: any;
  constructor(private _formBuilder: FormBuilder, private orderDetailService: OrderDetailService,
    private router2: Router, private router: ActivatedRoute, private route: Router, private spinnerservice: Ng4LoadingSpinnerService) {
    if (JSON.parse(sessionStorage.getItem('currentUser')) === null) {
      console.log('url-------->', this.router2.url);
      sessionStorage.setItem('urlDirect', this.router2.url);
      this.router2.navigate(['']);
    }
  }

  ngOnInit() {
    this.spinnerservice.show();
    this.Openticket = 0;
    this.activeorder = 0;
    this.Shippedorder = 0;
    this.Delayedorder = 0;
    this.voidorder = 0;
    this.Closeticket = 0;
    this.inprogress = 0;
    this.showDetails = false;
    this.getQueryDetails();

    // this.intializeDataValues();
  }
  ngAfterViewInit() {
    // this.setStepper();
  }
  connect(): Observable<Element[]> {
    const rows = [];
    this.listOrderDetail.forEach(element => rows.push(element, { detailRow: true, element }));
    this.orderdetail = this.listOrderDetail;
    this.dataSource = new MatTableDataSource(rows);
    this.sortPage();
    // this.dataSource.paginator = this.paginator;
    return Observable.of(rows);
  }
  intializeDataValues() {
    this.dataSource = new MatTableDataSource(this.listOrderDetail);
    this.sortPage();
    // this.connect();
  }

  getQueryDetails() {
    this.router.queryParams.subscribe(params => {
      const orderId = params['orderId'];
      console.log('uuid value are a------>', orderId);
      this.getOrder(orderId);
    });
  }


  getOrder(id) {
    this.tstatus = [];
    this.orderDetailService.getOrder(id)
      .subscribe(data => {
        this.Order = data;
        this.spinnerservice.hide();
        this.test1.StatusName = data.StatusName;
        this.ticket = data.Ticket;
        this.ticketcount = data.Tickets;
        this.ticket.forEach(element => {
          element.assigned_to.forEach(element2 => {
            this.test = element2.firstname;
          });
        });
        this.ticket.forEach(element => {
          this.createdby = element.created_by.firstname;
        });

        if (this.ticketcount !== undefined) {
          // this.ticketlength = this.ticket.length;
          for (let i = 0; i < this.ticket.length; i++) {
            this.ticketstatus = this.ticket[i].Status;
            if (this.ticketstatus === 'Open') {
              this.Openticket = this.Openticket + 1;
            }
            if (this.ticketstatus === 'Close') {
              this.Closeticket = this.Closeticket + 1;
            }
            if (this.ticketstatus === 'Assigned') {
              this.inprogress = this.inprogress + 1;
            }
            this.ticketdate = this.ticket[i].Date;
            this.tstatus.push(this.ticketstatus);
          }
        }
        this.listOrderDetail = data.SalesOrderItems;
        // this.getuser();
        this.listofstatus();
        this.setStepper();
        this.showStepper = true;
        this.intializeDataValues();
      },
        error => {
          console.log('error------->', error);
        });
  }
  sortPage() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'Item': return item.ItemNumber;
        case 'Style': return item.StyleNumber;
        case 'Color': return item.StyleColor;
        case 'style_option': return item.StyleOption;
        case 'Quantity': return item.QuantityRequested;
        case 'Price': return item.UnitPrice;
        case 'ShippingMethod': return item.shippingmethod;
        case 'ArtworkStatus': return item.ArtworkStatus;
        default: return item[property];
      }
    };
  }
  setStepper() {
    if (this.test1.StatusName === 'Complete') {
      return 3;
    }
    if (this.test1.StatusName === 'Shipped') {
      return 2;
    }
    if (this.test1.StatusName === 'Released') {
      return 0;
    }
    if (this.test1.StatusName === 'Processed') {
      return 1;
    }
  }

  // getuser() {
  //   this.orderDetailService.getuserid(this.test).subscribe(data => {
  //     this.user = data;
  //     this.dataSource.sort = this.sort;
  //     this.dataSource.paginator = this.paginator;
  //     // console.log('---------user----------', this.user);
  //   }, error => { });

  // }
  Onclick(row) {
    // this.success = true;
    this.connect();
    this.orderdetail = row.SalesOrderDetails;
  }
  listofstatus() {
    this.salesoderdetails = this.listOrderDetail;
    // this.orderdetail = [];
    this.orderstatus = [];
    this.saleorderstatus = [];
    this.activeorder = 0;
    this.Shippedorder = 0;
    this.Delayedorder = 0;
    this.voidorder = 0;
    // this.success = true;
    this.salesoderdetails.forEach(element => {
      element.SalesOrderDetails.forEach(element2 => {
        this.orderstatus.push(element2.StatusName);

        if (element2.StatusName === 'Active') {
          this.active = true;
          this.activeorder = this.activeorder + 1;
        }
        if (element2.StatusName === 'Delayed') {
          this.delayed = true;
          this.Delayedorder = this.Delayedorder + 1;
        }
        if (element2.StatusName === 'Shipped') {
          this.shipped = true;
          this.Shippedorder = this.Shippedorder + 1;
        }
        if (element2.StatusName === 'Void') {
          this.void = true;
          this.voidorder = this.voidorder + 1;
        }
      });
    });
    this.saleorderstatus = Array.from(new Set(this.orderstatus.map((itemInArray) => itemInArray)));

  }
  newticket() {
    this.route.navigate(['/ticketcreation'], { queryParams: { orderId: this.Order.OrderID } });
  }
  Activeclick() {
    this.active = false;
  }
  Shippedclick() {
    this.shipped = false;
  }
  Delayedclick() {
    this.delayed = false;
  }
  Voidclick() {
    this.void = false;
  }

}
