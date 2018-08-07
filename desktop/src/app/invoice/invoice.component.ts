import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';

import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { IInvoices } from './Iinvoices';
import { InvoiceService } from './invoice.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlertDialogComponent } from '../dialog/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InvoiceComponent implements OnInit, AfterViewInit {
  private filter_invoiceItems: number[];
  private filter_invoiceStatus: string[];
  private selectedValue: any[];
  private filterArr: any[];
  selectfilter = new FormControl();
  private listOfInvoices: IInvoices[] = [];
  private invoicedetails: any;

  private status = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private IInvoices: IInvoices = {
    uuid: '',
    date: '',
    status: '',
    items: 0,
    orderId: '',
    total: 0,
    SalesOrder: [],
    InvoiceDetails: []
  };
  private itemfilter: String[] = [];
  private statusfilter: String[] = [];
  private itemvalue: any;
  private statusvalue: any;
  selectedItems: any;

  expandedElement: any;

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  // tslint:disable-next-line:member-ordering
  displayedColumns = ['Number', 'Date', 'OrderID', 'Items', 'Total', 'Status'];
  // dataSource: MatTableDataSource<IOrders>;
  // tslint:disable-next-line:member-ordering
  dataSource: any = [];

  constructor(private invoiceService: InvoiceService, private spinnerService: Ng4LoadingSpinnerService, private dailog: MatDialog) { }

  ngOnInit() {
    // this.spinnerService.show();
    this.getAllInvoices();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllInvoices() {
    this.invoiceService.getallInvoice()
      .subscribe(data => {
        if (data === 'There is no Invoice') {
          this.OpenDialog();
          this.listOfInvoices = [];
          this.dataSource = new MatTableDataSource(this.listOfInvoices);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.listOfInvoices = data;
          this.dataSource = new MatTableDataSource(this.listOfInvoices);
          this.sortPage();
          this.filter_invoiceItems = Array.from(new Set(this.listOfInvoices.map((itemInArray) => itemInArray.InvoiceDetails.length)));
          // this.filter_invoiceStatus = Array.from(new Set(this.listOfInvoices.map((customerArray => customerArray.status))));
          this.filter_invoiceStatus = Array.from(new Set(this.listOfInvoices.map((customerArray) => customerArray.SalesOrder.StatusName)));
          this.filter_invoiceStatus = this.filter_invoiceStatus.filter((obj) => obj !== null && obj !== undefined);
          this.filter_invoiceItems = this.filter_invoiceItems.sort((a: any , b: any) => a - b);
          this.filter_invoiceStatus = this.filter_invoiceStatus.sort();
        }
      },
        error => {
          console.log('error------->', error);
        });
  }

  OpenDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '35%';
    dialogConfig.position = {
      bottom: '18%',
    };
    dialogConfig.direction = 'rtl';
    dialogConfig.data = ' No Data in Invoice';
    const dialogRef = this.dailog.open(AlertDialogComponent, dialogConfig);
  }

  connect(): Observable<Element[]> {
    const rows = [];
    this.listOfInvoices.forEach(element => rows.push(element, { detailRow: true, element }));
    this.dataSource = new MatTableDataSource(rows);
    this.sortPage();
    return Observable.of(rows);

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


  ItemsFilter() {
    this.itemfilter = this.selectfilter.value;
    this.filter();
  }

  StatusFilter() {
    this.statusfilter = this.selectfilter.value;
    this.filter();
  }

  filter() {
    this.filterArr = [];
    this.itemvalue = [];
    this.statusvalue = [];
    if (this.itemfilter.length === 0 && this.statusfilter.length === 0) {
      this.initializeValue();
    }
    if (this.itemfilter.length !== 0 && this.statusfilter.length === 0) {
      this.itemfilter.forEach(element => {

        this.listOfInvoices.forEach(one => {
          if (one.InvoiceDetails.length === element) {
            this.filterArr.push(one);
          }
          const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
          this.dataSource = new MatTableDataSource(filterdata);
          this.sortPage();
        });

      });
    }
    if (this.statusfilter.length !== 0 && this.itemfilter.length === 0) {
      this.statusfilter.forEach(element => {

        this.listOfInvoices.forEach(one => {
          if (one.SalesOrder.StatusName === element) {
            this.filterArr.push(one);
          }
          const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
          this.dataSource = new MatTableDataSource(filterdata);
          this.sortPage();
        });

      });
    }
    if (this.itemfilter.length !== 0 && this.statusfilter.length !== 0) {
      this.itemfilter.forEach(element => {
        this.itemvalue.push(element);
      });
      this.statusfilter.forEach(element2 => {
        this.statusvalue.push(element2);
      });
      this.listOfInvoices.forEach(one => {
        this.itemvalue.forEach(number => {
          this.statusvalue.forEach(status => {
            if (one.InvoiceDetails.length === number && one.SalesOrder.StatusName === status) {
              this.filterArr.push(one);
            }
          });
        });
        const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filterdata);
        this.sortPage();
      });

    }

  }

  initializeValue() {
    this.dataSource = new MatTableDataSource(this.listOfInvoices);
    this.sortPage();
  }

  sortPage() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'Number': return item.InvoiceNumber;
        case 'Date': return item.InvoiceDate;
        case 'OrderID': return item.SalesOrder.OrderID;
        case 'Items': return item.InvoiceDetails.length;
        case 'Total': return item.TotalPrice;
        case 'Status': return item.StatusName;
        default: return item[property];
      }
    };
  }

  Onclick(row) {
    console.log('-------row---------', row.InvoiceDetails);
    this.connect();
    this.invoicedetails = row.InvoiceDetails;
    // this.router.navigate(['/inventoryitem'], { queryParams: {uuid: row.uuid} });
  }
}
