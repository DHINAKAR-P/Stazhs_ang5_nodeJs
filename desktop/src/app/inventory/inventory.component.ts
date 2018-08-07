import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';

import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Inventory } from './Inventory';
import { InventoryService } from './inventory.service';
declare var jquery: any;
import { ApiService } from '../config/api.service';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { animate, state, style, transition, trigger } from '@angular/animations';
import 'rxjs/add/observable/of';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlertDialogComponent } from '../dialog/alert-dialog/alert-dialog.component';



@Component({
  selector: 'app-orders',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class InventoryComponent implements OnInit, AfterViewInit {
  private selectfilter = new FormControl();
  private selectedValue: any;
  private listOfInventory: Inventory[] = [];
  private filter_listOfInventorycolor: any[] = [];
  private filter_listOfInventorysize: any[] = [];
  private filter_listOfInventorystyle: any[] = [];
  private filterArr: any[];
  private status = [];
  private itemsuuid: any[] = [];
  private inventoryitems: any;
  private inventory: any;
  private filterdata: any[] = [];
  private styleSelectedValue: String[] = [];
  private colorSelectedValue: String[] = [];
  private sizeSelectedValues: String[] = [];
  private stylevalue: any;
  private colorvalue: any;
  private sizevalue: any;
  length = 100;

  expandedElement: any;
  // tslint:disable-next-line:max-line-length
  displayedColumns = ['style', 'color', 'size', 'style_option', 'style_name', 'on_hand', 'allocated', 'available', 'quarantined', 'scrapped'];


  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');

  // tslint:disable-next-line:member-ordering
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // tslint:disable-next-line:member-ordering
  @ViewChild(MatSort) sort: MatSort;
  // tslint:disable-next-line:member-ordering
  selectedLocation: any;
  // dataSource: MatTableDataSource<IOrders>;
  // tslint:disable-next-line:member-ordering
  dataSource: any = [];

  constructor(private inventoryService: InventoryService, private apiService: ApiService,
    private router: Router, private spinnerService: Ng4LoadingSpinnerService, private dialog: MatDialog) { }

  ngOnInit() {
    this.spinnerService.show();
    this.getAllActiveInventories();
  }
  connect(): Observable<Element[]> {
    const rows = [];
    // console.log('filter data values ---rows-- ', rows, this.filterdata.length, this.listOfInventory.length);
    // this.listOfInventory.forEach(element => rows.push(element, { detailRow: true, element }));\
    if (this.filterdata.length === 0) {
      // console.log('entering into if condition');
      this.listOfInventory.forEach(element => {
        if (element.StatusName !== null) {
          rows.push(element, { detailRow: true, element });
        }
      });
    } else {
      // console.log('entering into else part condition');
      this.filterdata.forEach(element => {
        if (element.StatusName !== null) {
          rows.push(element, { detailRow: true, element });
        }
      });
    }
    this.dataSource = new MatTableDataSource(rows);
    this.length = rows.length;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sortPage();
    // console.log('data rows--------->', rows);
    return Observable.of(rows);

  }

  getAllActiveInventories() {
    this.inventory = [];
    this.inventoryService.getAllActiveInventories().subscribe(
      data => {
        // console.log('----------------', data);
        this.listOfInventory = data;
        if (data === 'There is no Inventory') {
          console.log('entering into on data ----- if condition ');
          this.inventory = [];
          this.listOfInventory = [];
          this.dataSource = new MatTableDataSource(this.inventory);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.sortPage();
          this.spinnerService.hide();
          this.OpenDialog();
        } else {
          console.log('get all active inventories are ----- ', this.listOfInventory);
          // if (this.listOfInventory.StatusName !== undefined){
          //   this.listOfInventory.push(data);
          // }
          // this.listOfInventory.forEach(element => {
          //   this.inventory= element;
          // })
          this.spinnerService.hide();
          this.listOfInventory.forEach(element => {
            if (element.StatusName !== null) {
              this.inventory.push(element);
            }
          });
          this.listOfInventory = this.inventory;
          this.length = this.listOfInventory.length;
          // console.log('---------------', this.inventory[0].Allocated);
          this.dataSource = new MatTableDataSource(this.inventory);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.sortPage();
          this.filter_listOfInventorycolor = Array.from(new Set(this.inventory.map((itemInArray) => itemInArray.StyleColor)));
          this.filter_listOfInventorysize = Array.from(new Set(this.inventory.map((itemInArray) => itemInArray.GarmentSize)));
          this.filter_listOfInventorystyle = Array.from(new Set(this.inventory.map((itemInArray) => itemInArray.StyleNumber)));
          // tslint:disable-next-line:max-line-length
          this.filter_listOfInventorycolor = this.filter_listOfInventorycolor.filter((obj) => obj != null);
          this.filter_listOfInventorysize = this.filter_listOfInventorysize.filter((obj) => obj != null);
          this.filter_listOfInventorystyle = this.filter_listOfInventorystyle.filter((obj) => obj != null);
          this.filter_listOfInventorycolor = this.filter_listOfInventorycolor.sort();
          this.filter_listOfInventorysize = this.filter_listOfInventorysize.sort();
          this.filter_listOfInventorystyle = this.filter_listOfInventorystyle.sort();
          //  this.filter_ticketStatus = this.filter_ticketStatus.filter((obj) => obj.length > 0);
          // this.connect();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sortPage();
  }

  OpenDialog() {
    this.spinnerService.hide();
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '35%';
    dialogConfig.position = {
      bottom: '18%',
    };
    dialogConfig.direction = 'rtl';
    dialogConfig.data = 'no data in Inventory';
    const dialogRef = this.dialog.open(AlertDialogComponent, dialogConfig);

  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // filter() {
  //   console.log('entering into filter methods are ');
  //   this.filterArr = [];
  //   if (this.selectedLocation !== undefined) {
  //     if (this.selectedLocation.length === 0) {
  //       this.dataSource = new MatTableDataSource(this.listOfInventory);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;

  //     } else {
  //       this.selectedLocation.forEach(element => {
  //         this.listOfInventory.forEach(one => {
  //           if (one.StatusName === element) {
  //             this.filterArr.push(one);
  //           }
  //           if (one.StyleColor === element) {
  //             this.filterArr.push(one);
  //           }
  //           if (one.GarmentSize === element) {
  //             this.filterArr.push(one);
  //           }
  //           const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
  //           this.dataSource = new MatTableDataSource(filterdata);
  //           this.dataSource.paginator = this.paginator;
  //           this.dataSource.sort = this.sort;
  //         });
  //       });
  //     }
  //   }
  // }

  styleFilter() {
    this.styleSelectedValue = this.selectfilter.value;
    this.filterDetails();
  }
  colorFilter() {
    this.colorSelectedValue = this.selectfilter.value;
    this.filterDetails();
  }
  sizeFilter() {
    this.sizeSelectedValues = this.selectfilter.value;
    this.filterDetails();
  }


  filterDetails() {
    this.filterArr = [];
    this.filterdata = [];
    if (this.styleSelectedValue.length === 0 && this.colorSelectedValue.length === 0 &&
      this.sizeSelectedValues.length === 0) {
      this.initializeValue();
    }
    if (this.styleSelectedValue.length !== 0 && this.colorSelectedValue.length !== 0 && this.sizeSelectedValues.length === 0) {
      this.styleSelectedValue.forEach(element => {
        this.stylevalue = element;
        // tslint:disable-next-line:no-shadowed-variable
        this.colorSelectedValue.forEach(element => {
          this.colorvalue = element;
          this.inventory.forEach(one => {
            if (one.StyleNumber === this.stylevalue && one.StyleColor === this.colorvalue) {
              this.filterArr.push(one);
            }
            this.filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
            this.dataSource = new MatTableDataSource(this.filterdata);
            this.length = this.filterdata.length;
            this.paginator.pageIndex = 0;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.sortPage();
          });
        });
      });

    }
    if (this.styleSelectedValue.length !== 0 && this.sizeSelectedValues.length !== 0 && this.colorSelectedValue.length === 0) {
      console.log('entering into style and size values are ----- $#$%%');
      this.styleSelectedValue.forEach(element => {
        this.stylevalue = element;
        // tslint:disable-next-line:no-shadowed-variable
        this.sizeSelectedValues.forEach(element => {
          this.sizevalue = element;
          this.inventory.forEach(one => {
            if (one.StyleNumber === this.stylevalue && one.GarmentSize === this.sizevalue) {
              this.filterArr.push(one);
            }
            this.filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
          });
        });
      });
      this.dataSource = new MatTableDataSource(this.filterdata);
      this.length = this.filterdata.length;
      this.paginator.pageIndex = 0;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.sortPage();

    }
    if (this.colorSelectedValue.length !== 0 && this.sizeSelectedValues.length !== 0 && this.styleSelectedValue.length === 0) {
      this.colorSelectedValue.forEach(element => {
        this.colorvalue = element;
      });
      this.sizeSelectedValues.forEach(element => {
        this.sizevalue = element;
      });
      this.inventory.forEach(one => {
        if (one.StyleColor === this.colorvalue && one.GarmentSize === this.sizevalue) {
          this.filterArr.push(one);
        }
        this.filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
      });
      this.dataSource = new MatTableDataSource(this.filterdata);
      this.length = this.filterdata.length;
      this.paginator.pageIndex = 0;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.sortPage();

    }
    if (this.colorSelectedValue.length !== 0 && this.sizeSelectedValues.length !== 0 && this.sizeSelectedValues.length !== 0) {
      this.colorSelectedValue.forEach(element => {
        this.colorvalue = element;
        // tslint:disable-next-line:no-shadowed-variable
        this.sizeSelectedValues.forEach(element => {
          this.sizevalue = element;
        // tslint:disable-next-line:no-shadowed-variable
          this.styleSelectedValue.forEach(element => {
            this.stylevalue = element;
            this.inventory.forEach(one => {
              if (one.StyleColor === this.colorvalue && one.GarmentSize === this.sizevalue && one.StyleNumber === this.stylevalue) {
                this.filterArr.push(one);
              }
              this.filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
            });
          });
        });
      });
      this.dataSource = new MatTableDataSource(this.filterdata);
      this.length = this.filterdata.length;
      this.paginator.pageIndex = 0;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.sortPage();
    }

    if (this.styleSelectedValue.length !== 0 && this.colorSelectedValue.length === 0 && this.sizeSelectedValues.length === 0) {
      this.styleSelectedValue.forEach(element => {
        this.inventory.forEach(one => {
          if (one.StyleNumber === element) {
            this.filterArr.push(one);
          }
        });
      });
      this.filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
      this.dataSource = new MatTableDataSource(this.filterdata);
      this.length = this.filterdata.length;
      this.paginator.pageIndex = 0;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.sortPage();
    }
    if (this.colorSelectedValue.length !== 0 && this.styleSelectedValue.length === 0 && this.sizeSelectedValues.length === 0) {
      this.colorSelectedValue.forEach(element => {

        this.inventory.forEach(one => {
          if (one.StyleColor === element) {
            this.filterArr.push(one);
          }
        });

      });
      this.filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
      this.dataSource = new MatTableDataSource(this.filterdata);
      this.length = this.filterdata.length;
      this.paginator.pageIndex = 0;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.sortPage();

    }
    if (this.sizeSelectedValues.length !== 0 && this.colorSelectedValue.length === 0 && this.colorSelectedValue.length === 0) {
      this.sizeSelectedValues.forEach(element => {

        this.inventory.forEach(one => {
          if (one.GarmentSize === element) {
            this.filterArr.push(one);
          }
        });

      });
      this.filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
      this.dataSource = new MatTableDataSource(this.filterdata);
      this.length = this.filterdata.length;
      this.paginator.pageIndex = 0;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.sortPage();

    }
  }

  // styleFilter() {
  //   this.selectedValue = [];
  //   this.filterArr = [];
  //   this.filterdata = [];
  //   this.selectedValue = this.selectfilter.value;
  //   if (this.selectedValue.length === 0) {
  //     this.initializeValue();
  //   } else {
  //     this.selectedValue.forEach(element => {

  //       this.inventory.forEach(one => {
  //         // if (one.StatusName === element) {
  //         //   this.filterArr.push(one);
  //         // }
  //         if (one.StyleNumber === element) {
  //           this.filterArr.push(one);
  //         }
  //         // if (one.GarmentSize === element) {
  //         //   this.filterArr.push(one);
  //         // }
  //         this.filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
  //         this.dataSource = new MatTableDataSource(this.filterdata);
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;
  //       });

  //     });
  //   }

  // }

  // colorFilter() {
  //   this.selectedValue = [];
  //   this.filterArr = [];
  //   this.filterdata = [];
  //   this.selectedValue = this.selectfilter.value;

  //   if (this.selectedValue.length === 0) {
  //     this.initializeValue();
  //   } else {
  //     this.selectedValue.forEach(element => {

  //       this.inventory.forEach(one => {
  //         if (one.StyleColor === element) {
  //           this.filterArr.push(one);
  //         }
  //         this.filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
  //         this.dataSource = new MatTableDataSource(this.filterdata);
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;
  //       });

  //     });
  //   }
  // }

  // sizeFilter() {
  //   this.selectedValue = [];
  //   this.filterArr = [];
  //   this.filterdata = [];
  //   this.selectedValue = this.selectfilter.value;

  //   if (this.selectedValue.length === 0) {
  //     this.initializeValue();
  //   } else {
  //     this.selectedValue.forEach(element => {

  //       this.inventory.forEach(one => {
  //         if (one.GarmentSize === element) {
  //           this.filterArr.push(one);
  //         }
  //         this.filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
  //         this.dataSource = new MatTableDataSource(this.filterdata);
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;
  //       });

  //     });
  //   }

  // }

  initializeValue() {
    this.dataSource = new MatTableDataSource(this.inventory);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sortPage();
  }
  sortPage() {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'style': return item.StyleNumber;
        case 'style_desc': return item.Description;
        case 'color': return item.StyleColor;
        case 'size': return item.GarmentSize;
        case 'style_option': return item.StyleOption;
        case 'style_name': return item.StyleName;
        case 'on_hand': return item.QuantityOnHand;
        case 'allocated': return item.Allocated;
        case 'available': return item.AdjustedQuantityOnHand;
        case 'quarantined': return item.QuantitySeconds;
        case 'scrapped': return item.QuantityThirds;
        case 'quarantined': return item.QuantitySeconds;
        default: return item[property];
      }
    };
  }
  Onclick(row) {
    console.log('-------row---------', row.FinishedGoodsAdjustments);
    this.connect();
    this.inventoryitems = row.FinishedGoodsAdjustments;
    // this.router.navigate(['/inventoryitem'], { queryParams: {uuid: row.uuid} });
  }

}
