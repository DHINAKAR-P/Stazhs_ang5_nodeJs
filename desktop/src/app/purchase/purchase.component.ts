import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { IPurchase } from './IPurchase';
import { PurchaseOrderService } from './purchaseorder.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlertDialogComponent } from '../dialog/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private selectedValue: any = [];
  private filter_purchaseOrderLocation: String[] = [];
  private filter_purchaseOrderStatus: String[] = [];
  private filter_purchaseOrderCustomer: String[] = [];
  dataSource: any;
  private locationvalue: any;
  private customervalue: any;
  private statusvalue: any;
  private purchaseDetails: IPurchase[];
  private locationfilter: String[] = [];
  private statusfilter: String[] = [];
  private customerfilter: String[] = [];
  displayedColumns = ['Number', 'Loc', 'Customer', 'Date', 'OrderStatus', 'Tickets', 'ForcastedArrival', 'ArrivalDate'];
  constructor(private purchase_order_service: PurchaseOrderService, private router: Router,
    private spinnerservice: Ng4LoadingSpinnerService, private dialog: MatDialog) { }

  private filterArr: any = [];

  selectfilter = new FormControl();

  ngOnInit() {
    this.spinnerservice.show();
    this.intializeDataValues();
    this.getallPurchaseOrder();
  }

  getallPurchaseOrder() {
    this.purchase_order_service.getAllPurchaseOrdes().subscribe(
      data => {
        this.purchaseDetails = data;
        console.log('data po-------->', data);

        this.dataSource = new MatTableDataSource(this.purchaseDetails);
        this.spinnerservice.hide();
        if (data.length === 0) {
          this.OpenDialog();
        }
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'Number': return item.ReceiveID;
            case 'Loc': return item.CompanyCode;
            case 'Customer': return item.SalesOrder.CustomerCode;
            case 'OrderStatus': return item.VendorPO.StatusName;
            case 'Tickets': return item.SalesOrder.Tickets;
            case 'ForcastedArrival': return item.SalesOrder.ForecastFinish;
            case 'ArrivalDate': return item.VendorPO.FinishDate;
            case 'Date': return item.VendorPO.OrderDate;
            default: return item[property];
          }
        };
        // this.filter_purchaseOrderLocation = Array.from(new Set(this.purchaseDetails.map((itemInArray) => itemInArray.loc)));
        // this.filter_purchaseOrderStatus = Array.from(new Set(this.purchaseDetails.map((itemInArray) => itemInArray.order_status)));
        // this.filter_purchaseOrderCustomer = Array.from(new Set(this.purchaseDetails.map((customerArray => customerArray.customer))));

        // tslint:disable-next-line:max-line-length
        this.filter_purchaseOrderLocation = Array.from(new Set(this.purchaseDetails.map((customerArray) => customerArray.CompanyCode)));
        // this.filter_purchaseOrderLocation = this.filter_purchaseOrderLocation.filter((obj) => obj !== null && obj.length > 0);

        // tslint:disable-next-line:max-line-length
        this.filter_purchaseOrderStatus = Array.from(new Set(this.purchaseDetails.map((customerArray) => customerArray.VendorPO.StatusName)));
        // this.filter_purchaseOrderStatus = this.filter_purchaseOrderStatus.filter((obj) => obj !== null && obj.length > 0);

        // tslint:disable-next-line:max-line-length
        this.filter_purchaseOrderCustomer = Array.from(new Set(this.purchaseDetails.map((customerArray) => customerArray.SalesOrder.CustomerCode)));
        // this.filter_purchaseOrderCustomer = this.filter_purchaseOrderCustomer.filter((obj) => obj !== null && obj.length > 0);
        this.filter_purchaseOrderLocation = this.filter_purchaseOrderLocation.filter((obj) => obj !== undefined);
        this.filter_purchaseOrderStatus = this.filter_purchaseOrderStatus.filter((obj) => obj !== undefined);
        this.filter_purchaseOrderCustomer = this.filter_purchaseOrderCustomer.filter((obj) => obj !== undefined);
        this.filter_purchaseOrderLocation = this.filter_purchaseOrderLocation.sort();
        this.filter_purchaseOrderStatus = this.filter_purchaseOrderStatus.sort();
        this.filter_purchaseOrderCustomer = this.filter_purchaseOrderCustomer.sort();
        // tslint:disable-next-line:max-line-length
      },
      error => {
        console.log(error);
      }
    );
  }

  OpenDialog() {
    const dialogConfig = new MatDialogConfig();
    this.spinnerservice.hide();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '35%';
    dialogConfig.position = {
      bottom: '18%',
    };
    dialogConfig.direction = 'rtl';
    dialogConfig.data = 'No Data in Purchase Orders ';
    const dialogRef = this.dialog.open(AlertDialogComponent, dialogConfig);
  }


  intializeDataValues() {
    this.dataSource = new MatTableDataSource(this.purchaseDetails);
    this.sortPage();
  }
  sortPage() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'Number': return item.ReceiveID;
        case 'Loc': return item.CompanyCode;
        case 'Customer': return item.SalesOrder.CustomerCode;
        case 'OrderStatus': return item.VendorPO.StatusName;
        case 'Tickets': return item.SalesOrder.Tickets;
        case 'ForcastedArrival': return item.SalesOrder.ForecastFinish;
        case 'ArrivalDate': return item.VendorPO.FinishDate;
        case 'Date': return item.VendorPO.OrderDate;
        default: return item[property];
      }
    };
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  Locationfiltervalue() {
    this.locationfilter = this.selectfilter.value;
    this.filter();
  }
  Customerfiltervalue() {
    this.customerfilter = this.selectfilter.value;
    this.filter();
  }
  Statusfiltervalue() {
    this.statusfilter = this.selectfilter.value;
    this.filter();
  }
  filter() {
    this.filterArr = [];
    this.locationvalue = [];
    this.statusvalue = [];
    this.customervalue = [];
    if (this.locationfilter.length === 0 && this.customerfilter.length === 0 &&
      this.statusfilter.length === 0) {
      this.intializeDataValues();
    }
    if (this.locationfilter.length !== 0 && this.customerfilter.length === 0 && this.statusfilter.length === 0) {
      this.locationfilter.forEach(element => {

        this.purchaseDetails.forEach(one => {
          if (one.CompanyCode === element) {
            this.filterArr.push(one);
          }
          const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
          this.dataSource = new MatTableDataSource(filterdata);
        this.sortPage();
        });

      });
    }
    if (this.customerfilter.length !== 0 && this.locationfilter.length === 0 && this.statusfilter.length === 0) {
      this.customerfilter.forEach(element => {

        this.purchaseDetails.forEach(one => {
          if (one.SalesOrder.CustomerCode === element) {
            this.filterArr.push(one);
          }
          const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
          this.dataSource = new MatTableDataSource(filterdata);
          this.sortPage();
        });

      });
    }
    if (this.statusfilter.length !== 0 && this.locationfilter.length === 0 && this.customerfilter.length === 0) {
      this.statusfilter.forEach(element => {

        this.purchaseDetails.forEach(one => {
          if (one.VendorPO.StatusName === element) {
            this.filterArr.push(one);
          }
          const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
          this.dataSource = new MatTableDataSource(filterdata);
          this.sortPage();
        });

      });
    }
    if (this.statusfilter.length !== 0 && this.locationfilter.length !== 0) {
      this.statusfilter.forEach(element => {
        this.statusvalue.push(element);
      });
      this.locationfilter.forEach(element => {
        this.locationvalue.push(element);
      });
      this.purchaseDetails.forEach(one => {
        this.statusvalue.forEach(status => {
          this.locationvalue.forEach(location => {
            if (one.VendorPO.StatusName === status && one.CompanyCode === location) {
              this.filterArr.push(one);
            }
          });
        });
        const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filterdata);
        this.sortPage();
      });

    }
    if (this.customerfilter.length !== 0 && this.locationfilter.length !== 0) {
      this.customerfilter.forEach(element => {
        this.customervalue.push(element);
      });
      this.locationfilter.forEach(element => {
        this.locationvalue.push(element);
      });
      this.purchaseDetails.forEach(one => {
        this.customervalue.forEach(status => {
          this.locationvalue.forEach(location => {
            if (one.SalesOrder.CustomerCode === status && one.CompanyCode === location) {
              this.filterArr.push(one);
            }
          });
        });
        const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filterdata);
        this.sortPage();
      });

    }
    if (this.customerfilter.length !== 0 && this.locationfilter.length !== 0 && this.statusfilter.length !== 0) {
      this.customerfilter.forEach(element => {
        this.customervalue.push(element);
      });
      this.locationfilter.forEach(element => {
        this.locationvalue.push(element);
      });
      this.statusfilter.forEach(element => {
        this.statusvalue.push(element);
      });
      this.purchaseDetails.forEach(one => {
        this.customervalue.forEach(customer => {
          this.locationvalue.forEach(location => {
            this.statusvalue.forEach(status => {
              if (one.SalesOrder.CustomerCode === customer && one.CompanyCode === location && one.VendorPO.StatusName === status) {
                this.filterArr.push(one);
              }
            });
          });
        });
        const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filterdata);
        this.sortPage();
      });

    }


    // this.selectedValue = [];
    // console.log('before filtering values are ---- ', this.selectfilter);
    // this.selectedValue = this.selectfilter.value;
    // console.log("selected value-------->",this.selectedValue)

    // if (this.selectedValue.length === 0) {
    //   this.intializeDataValues();
    // } else {
    //   this.selectedValue.forEach(element => {

    //     this.purchaseDetails.forEach(one => {
    //         if (one.SalesOrder.CompanyCode === element) {
    //           console.log("push value-------->")
    //           this.filterArr.push(one);
    //         }
    //         if (one.SalesOrder.CustomerCode === element) {
    //           console.log("push value-------->")
    //           this.filterArr.push(one);
    //         }
    //         if (one.SalesOrder.StatusName === element) {
    //           console.log("push value-------->")
    //           this.filterArr.push(one);
    //         }
    //       const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
    //       this.dataSource = new MatTableDataSource(filterdata);
    //       this.dataSource.paginator = this.paginator;
    //       this.dataSource.sort = this.sort;
    //     });

    //   });
    // }

  }

  // filterCustomer() {
  //   this.selectedValue = [];
  //   this.filterArr = [];
  //   console.log('before filtering values are ---- ', this.selectfilter);
  //   this.selectedValue = this.selectfilter.value;
  //   console.log("selected value-------->",this.selectedValue)

  //   if (this.selectedValue.length === 0) {
  //     this.intializeDataValues();
  //   } else {
  //     this.selectedValue.forEach(element => {

  //       this.purchaseDetails.forEach(one => {
  //           if (one.SalesOrder.CustomerCode === element) {
  //             console.log("push value-------->")
  //             this.filterArr.push(one);
  //           }
  //         const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
  //         this.dataSource = new MatTableDataSource(filterdata);
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;
  //       });

  //     });
  //   }

  // }

  // filterStatus() {
  //   this.selectedValue = [];
  //   this.filterArr = [];
  //   console.log('before filtering values are ---- ', this.selectfilter);
  //   this.selectedValue = this.selectfilter.value;
  //   console.log("selected value-------->",this.selectedValue)

  //   if (this.selectedValue.length === 0) {
  //     this.intializeDataValues();
  //   } else {
  //     this.selectedValue.forEach(element => {

  //       this.purchaseDetails.forEach(one => {
  //           if (one.SalesOrder.StatusName === element) {
  //             console.log("push value-------->")
  //             this.filterArr.push(one);
  //           }
  //         //const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
  //         this.dataSource = new MatTableDataSource(this.filterArr);
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;
  //       });

  //     });
  //   }

  // }



  onRowSelected(row) {
    console.log('uuid value are -------> ', row);
    this.router.navigate(['/purchase-detail'], { queryParams: { ReceiveID: row.ReceiveID } });
  }

}
