import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';

import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { IShipments } from './IShipments';
declare var jquery: any;
import { ShipmentsService } from './shipments.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlertDialogComponent } from '../dialog/alert-dialog/alert-dialog.component';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.css']
})
export class ShipmentsComponent implements OnInit {
  //  docDate = 'Jun 15, 2015, 21:43:11 UTC';
  date = new FormControl(new Date());
  serializedDate = new FormControl();
  private filter_PONumber: string[];
  private filter_shipmentMethod: any[];
  private filter_Style: String[] = [];
  private filter_Customer: any[];
  private beforeFilter_shipmentStatus: any[];
  private filter_shipmentStatus: string[];
  private selectedValue: any[];
  private filterArr: any[];
  private listOfShipments: any[] = [];
  private startDate: String;
  private endDate: String;
  private startDateMin: Date = new Date(2000, 0, 1);
  private startDateMax: Date = new Date();
  private endDateMin: Date = new Date(2000, 0, 1);
  private endDateMax: Date = new Date();
  private endDateDisable: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selectfilter = new FormControl();
  private IShipments: IShipments = {
    uuid: '',
    OrderUuid: '',
    item: 0,
    shipmentinfo: '',
    date: [],
    time: [],
    location: [],
    activity: []
  };
  private listOfShipment;
  private povalue: any;
  private customervalue: any;
  selectedLocation: any;


  displayedColumns = ['PONumber', 'ShipToName', 'ShipCity', 'State', 'Waybill', 'ShipDate', 'ShipMethod'];
  // dataSource: MatTableDataSource<IOrders>;
  dataSource: any = [];

  private shipmentdata = [];
  private ponfilter: String[] = [];
  private customerfilter: String[] = [];
  constructor(private spinnerservice: Ng4LoadingSpinnerService, private shipmentsService: ShipmentsService, private router: Router,
    private dailog: MatDialog, private datePipe: DatePipe) { }

  ngOnInit() {
    this.endDateDisable = true;
    this.spinnerservice.show();
    this.getAllShipments();

  }
  
  getAllShipments() {
    this.shipmentsService.getallShipments()
      .subscribe(data => {
        console.log('all shipments are ----- ', data);
        if (data === 'There is no Shipments') {
          data = [];
          this.dataSource = new MatTableDataSource(data);
          this.sortPage();
          this.spinnerservice.hide();
          this.OpenDialog();
        } else {
          this.dataSource = new MatTableDataSource(data);
          this.sortPage();
          this.listOfShipments = data;
          this.spinnerservice.hide();
          this.filter_PONumber = Array.from(new Set(this.listOfShipments.map((itemInArray) => itemInArray.PONumber)));
          this.filter_Customer = Array.from(new Set(this.listOfShipments.map((itemInArray) => itemInArray.CustomerID)));
          // tslint:disable-next-line:max-line-length
          const filterStyle = Array.from(new Set(this.listOfShipments.map((itemInArray) => itemInArray.ShipmentsItems.map((items) => items.StyleNumber))));
          filterStyle.forEach(element => {
            for (let i = 0; i < element.length; i++) {
              if (this.filter_Style.indexOf(element[i]) > -1) {

              } else {
                this.filter_Style.push(element[i]);
              }
            }
          });
          // this.filter_shipmentMethod = Array.from(new Set(this.listOfShipments.map((customerArray => customerArray))));
          // tslint:disable-next-line:max-line-length
          // tslint:disable-next-line:max-line-length
          this.beforeFilter_shipmentStatus = Array.from(new Set(this.listOfShipments.map((customerArray => customerArray.TrackingInfos.map(item => item.activity)))));
          const statusArray = [];
          this.beforeFilter_shipmentStatus.forEach(element => {
            for (let i = 0; i < element.length; i++) {
              statusArray.push(element[i]);
            }
          });
          this.filter_shipmentStatus = Array.from(new Set(statusArray.map(item => item)));
          this.filter_PONumber = this.filter_PONumber.sort();
          this.filter_Customer = this.filter_Customer.sort((a: any, b: any) => a - b);
        }
      },
        error => {
          console.log('error------->', error);
        });
  }

  PONumberFilter() {
    this.ponfilter = this.selectfilter.value;
    this.filter();
  }
  startDateCalcs(event) {
    this.convert(event , 'startDate');
  }
  endDateCalcs(event) {
    this.convert(event , 'endDate');
  }
  startDataInput() {
    this.convert(this.startDate , 'startDate');
  }
  endDataInput() {
    this.convert(this.endDate , 'endDate');
  }
   convert(str , methodName) {
  var mnths = {
    Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
    Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
  },
    date = str.toString().split(" ");
    if(methodName === 'startDate') {
    this.startDate = [date[3], mnths[date[1]], date[2]].join("-");
    // console.log('start date valeus in order are ---- ', date[3] , date[2] , mnths[date[1]]);
  this.endDateDisable = false;
    
    }
    if(methodName === 'endDate') {
      this.endDate = [date[3], mnths[date[1]], date[2]].join("-");
    }
// console.log('current date are ------ ' , [date[3], mnths[date[1]], date[2]].join("-"))
    this.filterDate();
}

filterDate() {
  this.filterArr = [];
  this.listOfShipments.forEach(one => {
    const shipDate = this.datePipe.transform(one.ShipDate, 'yyyy-MM-dd');
    // console.log('filter date values are -------- ', this.startDate , this.endDate , shipDate);
    if (shipDate >= this.startDate && this.endDate === undefined) {
      this.filterArr.push(one);
    } else {
      if(this.startDate <= shipDate && this.endDate >= shipDate) {
        this.filterArr.push(one);
      }
    }
    const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
    this.dataSource = new MatTableDataSource(filterdata);
    this.sortPage();
  });
}
CustomerFilter() {
  this.customerfilter = this.selectfilter.value;
  this.filter();
}
filter() {
  this.filterArr = [];
  this.povalue = [];
  this.customervalue = [];
  if (this.ponfilter.length === 0 && this.customerfilter.length === 0) {
    this.initializeValue();
  }
  if (this.ponfilter.length !== 0 && this.customerfilter.length === 0) {
    this.ponfilter.forEach(element => {

      this.listOfShipments.forEach(one => {
        if (one.PONumber === element) {
          this.filterArr.push(one);
        }
        const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filterdata);
        this.sortPage();
      });
    });

  }
  if (this.customerfilter.length !== 0 && this.ponfilter.length === 0) {
    this.customerfilter.forEach(element => {

      this.listOfShipments.forEach(one => {
        if (one.CustomerID === element) {
          this.filterArr.push(one);
        }
        const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filterdata);
        this.sortPage();
      });

    });
  }
  if (this.customerfilter.length !== 0 && this.ponfilter.length !== 0) {
    this.customerfilter.forEach(element => {
      this.customervalue.push(element);
    });
    this.ponfilter.forEach(element => {
      this.povalue.push(element);
    });
    this.listOfShipments.forEach(one => {
      this.customervalue.forEach(customer => {
        this.povalue.forEach(value => {
          if (one.CustomerID === customer && one.PONumber === value) {
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

StyleFilter() {
  this.selectedValue = [];
  this.filterArr = [];
  this.selectedValue = this.selectfilter.value;

  if (this.selectedValue.length === 0) {
    this.initializeValue();
  } else {
    this.selectedValue.forEach(element => {

      this.listOfShipments.forEach(one => {
        for (let i = 0; i < one.ShipmentsItems.length; i++) {
          if (one.ShipmentsItems[i].StyleNumber === element) {
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
initializeValue() {
  this.dataSource = new MatTableDataSource(this.listOfShipments);
  this.sortPage();
}
sortPage() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  this.dataSource.sortingDataAccessor = (item, property) => {
    switch (property) {
      case 'PONumber': return item.PONumber;
      case 'ShipToName': return item.ShipToName.toLowerCase();
      case 'ShipCity': return item[property];
      case 'State': return item.StatusName.toLowerCase();
      case 'Waybill': return item.WayBill.toLowerCase();
      case 'ShipDate': return item.ShipDate;
      case 'ShipMethod': return item.ShipperNumber.toLowerCase();
      // case 'Status': return item.status.toLowerCase();
      default: return item[property];
    }
  };
}

OpenDialog() {
  this.spinnerservice.hide();
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '35%';
  dialogConfig.position = {
    bottom: '18%',
  };
  dialogConfig.direction = 'rtl';
  dialogConfig.data = 'No Data in Shipments';
  const dialogRef = this.dailog.open(AlertDialogComponent, dialogConfig);
}

applyFilter(filterValue: string) {
  filterValue = filterValue.trim();
  filterValue = filterValue.toLowerCase();
  this.dataSource.filter = filterValue;
}

onRowSelected(row) {
  this.router.navigate(['/shipments-tems'], { queryParams: { shipmentId: row.ShipmentID } });
}

}
