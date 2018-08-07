import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { IOrders } from './IOrder';
import { OrderService } from './orders.service';
import { setTimeout } from 'timers-browserify';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlertDialogComponent } from '../dialog/alert-dialog/alert-dialog.component';

declare var jquery: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, AfterViewInit {
  filterdata: any[];
  private checked = [];
  private filter_OrderLocation: string[];
  private notify: any;
  private filter_OrderTickets: string[];
  private filter_OrderStatus: any[];
  private status = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selectedLocation: any;
  private purchaseDetails: any;
  private filterArr: any[];
  private filterArr1: any;
  private selectedValue: any[];
  private orderValue: any;
  private listOfOrders: any[] = [];
  private orderstatuslist: any;
  private Status: any;
  selectfilter = new FormControl();
  // private selectfilter: any;
  private loactionfiltervalue: String[] = [];
  private statusfiltervalue: String[] = [];
  private ticketfiltervalue: String[] = [];
  private Released: any;
  private ReleasedOrders: any;
  private Hold: any;
  private HoldOrders: any;
  private Committed: any;
  private CommittedOrders: any;
  private VoidOrders: any;
  private Complete: any;
  private CompleteOrders: any;
  private InCompleteOrders: any;
  private InComplete: any;
  public Processed: any;
  private ProcessedOrders: any;
  private Shipped: any;
  private ShippedOrders: any;
  private Void: any;
  displayedColumns = ['Number', 'Location', 'PO#', 'Date', 'Requested', 'Forecasted', 'Tickets', 'Status'];
  dataSource: any = [];

  constructor(private orderService: OrderService, private router: Router,
    private spinnerservice: Ng4LoadingSpinnerService, private dailog: MatDialog) { }
  ngOnInit() {
    this.spinnerservice.show();
    this.getAllOrders();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllOrders() {
    this.CompleteOrders = 0;
    this.ShippedOrders = 0;
    this.ProcessedOrders = 0;
    this.InCompleteOrders = 0;
    this.VoidOrders = 0;
    this.ReleasedOrders = 0;
    this.HoldOrders = 0;
    this.CommittedOrders = 0;
    this.orderService.getallOrders()
      .subscribe(data => {
        if (data === 'There is no Order') {
          this.OpenDialog();
          this.listOfOrders = [];
          this.dataSource = new MatTableDataSource(this.listOfOrders);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.listOfOrders = data;
          this.spinnerservice.hide();
          this.filter_OrderLocation = Array.from(new Set(this.listOfOrders.map((itemInArray) => itemInArray.CompanyCode)));
          this.filter_OrderLocation = this.filter_OrderLocation.filter((obj) => obj !== null && obj.length > 0);
          this.filter_OrderLocation = this.filter_OrderLocation.sort();
          this.filter_OrderTickets = Array.from(new Set(this.listOfOrders.map((itemInArray) => itemInArray.Tickets)));
          this.filter_OrderTickets = this.filter_OrderTickets.filter((obj) => obj !== null);
          this.filter_OrderTickets = this.filter_OrderTickets.sort((a: any, b: any) => a - b);
          this.filter_OrderStatus = Array.from(new Set(this.listOfOrders.map((customerArray) => customerArray.StatusName)));
          this.filter_OrderStatus = this.filter_OrderStatus.filter((obj) => obj !== null && obj.length > 0);
          this.filter_OrderStatus = this.filter_OrderStatus.sort();
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
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
          this.orderstatuslist = this.listOfOrders;
          this.orderstatuslist.forEach(element => {
            if (element.StatusName === 'Complete') {
              this.Complete = true;
              this.CompleteOrders = this.CompleteOrders + 1;
            }
            if (element.StatusName === 'Incomplete') {
              this.InComplete = true;
              this.InCompleteOrders = this.InCompleteOrders + 1;
            }
            if (element.StatusName === 'Processed') {
              this.Processed = true;
              this.ProcessedOrders = this.ProcessedOrders + 1;
            }
            if (element.StatusName === 'Shipped') {
              this.Shipped = true;
              this.ShippedOrders = this.ShippedOrders + 1;
            }
            if (element.StatusName === 'Void') {
              this.Void = true;
              this.VoidOrders = this.VoidOrders + 1;
            }
            if (element.StatusName === 'Released') {
              this.Released = true;
              this.ReleasedOrders = this.ReleasedOrders + 1;
            }
            if (element.StatusName === 'Hold') {
              this.Hold = true;
              this.HoldOrders = this.HoldOrders + 1;
            }
            if (element.StatusName === 'Committed') {
              this.Committed = true;
              this.CommittedOrders = this.CommittedOrders + 1;
            }

          });
        }
      },
        error => {
          // this.failure = true;
          // this.failuremessage = ' This Order is now delayed';
          console.log('error------->', error);
        });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
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
    dialogConfig.data = 'No Data in Orders ';
    const dialogRef = this.dailog.open(AlertDialogComponent, dialogConfig);
  }

  intializeDataValues() {
    this.dataSource = new MatTableDataSource(this.listOfOrders);
    this.sortPage();


  }
  Locationfilter() {
    this.loactionfiltervalue = this.selectfilter.value;
    this.filter();
  }
  Ticketfilter() {
    this.ticketfiltervalue = this.selectfilter.value;
    this.filter();

  }
  Statusfilter() {
    this.statusfiltervalue = this.selectfilter.value;
    this.filter();

  }
  locationFilterDetails() {
    this.loactionfiltervalue.forEach(element => {

      this.listOfOrders.forEach(one => {
        if (one.CompanyCode === element) {
          this.filterArr.push(one);
        }
      });
    });
    this.filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
  }
  ticketFilterDetails() {
    this.ticketfiltervalue.forEach(element => {
      this.listOfOrders.forEach(one => {
        if (one.Tickets === element) {
          this.filterArr.push(one);
        }
      });
    });
    this.filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));

  }
  statusFilterDetails() {
    this.statusfiltervalue.forEach(element => {
      this.listOfOrders.forEach(one => {
        if (one.StatusName === element) {
          this.filterArr.push(one);
        }
      });
    });
    this.filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
  }

  filter() {
    this.filterArr = [];
    const locationCount = this.loactionfiltervalue.length;
    const ticketCount = this.ticketfiltervalue.length;
    const statusCount = this.statusfiltervalue.length;
    if (locationCount === 0 && ticketCount === 0 && statusCount === 0) {
      this.intializeDataValues();
    } else if (locationCount === ticketCount && ticketCount === statusCount) {
      this.loactionfiltervalue.forEach(locationElement => {
        this.ticketfiltervalue.forEach(ticketElement => {
          this.statusfiltervalue.forEach(statusElement => {
            this.listOfOrders.forEach(one => {
              if (one.CompanyCode === locationElement && one.Tickets === ticketElement && one.StatusName === statusElement) {
                this.filterArr.push(one);
              }
              const filteredValue = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
              this.dataSource = new MatTableDataSource(filteredValue);
            });
          });
        });
      });
      this.sortPage();
    } else if (locationCount >= ticketCount && locationCount >= statusCount) {
      this.locationFilterDetails();
      let ticketFilter = [];
      let statusFilter = [];
      this.filterArr = [];
      let filteredValue = [];
      if (this.ticketfiltervalue.length === 0) {
        ticketFilter.push('');
      } else {
        ticketFilter = this.ticketfiltervalue;
      }
      if (this.statusfiltervalue.length === 0) {
        statusFilter.push('');
      } else {
        statusFilter = this.statusfiltervalue;
      }
      if (statusCount === 0 && ticketCount === 0) {
        this.dataSource = new MatTableDataSource(this.filterdata);
        this.sortPage();
      } else if (statusCount > 0 && ticketCount === 0) {
        statusFilter.forEach(statusElement => {
          this.filterdata.forEach(one => {
            if (one.StatusName === statusElement) {
              this.filterArr.push(one);
            }
          });
        });
        filteredValue = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filteredValue);
        this.sortPage();
      } else if (statusCount === 0 && ticketCount > 0) {
        ticketFilter.forEach(ticketElement => {
          this.filterdata.forEach(one => {
            if (one.Tickets === ticketElement) {
              this.filterArr.push(one);
            }
          });
        });
        filteredValue = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filteredValue);

        this.sortPage();
      } else if (statusCount <= ticketCount) {
        ticketFilter.forEach(ticketElement => {
          statusFilter.forEach(statusElement => {
            this.filterdata.forEach(one => {
              if (one.Tickets === ticketElement && one.CompanyCode === statusElement) {
                this.filterArr.push(one);
              }
            });
          });
        });
        filteredValue = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filteredValue);

        this.sortPage();
      } else if (statusCount >= ticketCount) {
        statusFilter.forEach(statusElement => {
          ticketFilter.forEach(ticketElement => {
            this.filterdata.forEach(one => {
              if (one.StatusName === statusElement && one.Tickets === ticketElement) {
                this.filterArr.push(one);
              }
            });
          });
        });
        filteredValue = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filteredValue);
        this.sortPage();
      }
    } else if (ticketCount >= locationCount && ticketCount >= statusCount) {
      this.ticketFilterDetails();
      let statusFilter = [];
      let locationFilter = [];
      this.filterArr = [];
      let filteredValue = [];
      if (this.statusfiltervalue.length === 0) {
        statusFilter.push('');
      } else {
        statusFilter = this.statusfiltervalue;
      }
      if (this.loactionfiltervalue.length === 0) {
        locationFilter.push('');
      } else {
        locationFilter = this.loactionfiltervalue;
      }
      if (locationCount === 0 && statusCount === 0) {
        this.dataSource = new MatTableDataSource(this.filterdata);
        this.sortPage();
      } else if (locationCount > 0 && statusCount === 0) {
        locationFilter.forEach(locationElement => {
          this.filterdata.forEach(one => {
            if (one.CompanyCode === locationElement) {
              this.filterArr.push(one);
            }
          });
        });
        filteredValue = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filteredValue);

        this.sortPage();
      } else if (locationCount === 0 && statusCount > 0) {
        statusFilter.forEach(statusElement => {
          this.filterdata.forEach(one => {
            if (one.StatusName === statusElement) {
              this.filterArr.push(one);
            }
          });
        });
        filteredValue = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filteredValue);

        this.sortPage();
      } else if (locationCount <= statusCount) {
        statusFilter.forEach(statusElement => {
          locationFilter.forEach(locationElement => {
            this.filterdata.forEach(one => {
              if (one.StatusName === statusElement && one.CompanyCode === locationElement) {
                this.filterArr.push(one);
              }
            });
          });
        });
        filteredValue = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filteredValue);

        this.sortPage();
      } else if (locationCount >= statusCount) {
        locationFilter.forEach(locationElement => {
          statusFilter.forEach(statusElement => {
            this.filterdata.forEach(one => {
              if (one.CompanyCode === locationElement && one.StatusName === statusElement) {
                this.filterArr.push(one);
              }
            });
          });
        });
        filteredValue = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filteredValue);
        this.sortPage();
      }
    } else if (statusCount >= locationCount && statusCount >= ticketCount) {
      this.statusFilterDetails();
      let ticketFilter = [];
      let locationFilter = [];
      this.filterArr = [];
      let filteredValue = [];
      if (this.ticketfiltervalue.length === 0) {
        ticketFilter.push('');
      } else {
        ticketFilter = this.ticketfiltervalue;
      }
      if (this.loactionfiltervalue.length === 0) {
        locationFilter.push('');
      } else {
        locationFilter = this.loactionfiltervalue;
      }
      if (locationCount === 0 && ticketCount === 0) {
        this.dataSource = new MatTableDataSource(this.filterdata);
        this.sortPage();
      } else if (locationCount > 0 && ticketCount === 0) {
        locationFilter.forEach(locationElement => {
          this.filterdata.forEach(one => {
            if (one.CompanyCode === locationElement) {
              this.filterArr.push(one);
            }
          });
        });
        filteredValue = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filteredValue);
        this.sortPage();
      } else if (locationCount === 0 && ticketCount > 0) {
        ticketFilter.forEach(ticketElement => {
          this.filterdata.forEach(one => {
            if (one.Tickets === ticketElement) {
              this.filterArr.push(one);
            }
          });
        });
        filteredValue = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filteredValue);
        this.sortPage();
      } else if (locationCount <= ticketCount) {
        ticketFilter.forEach(ticketElement => {
          locationFilter.forEach(locationElement => {
            this.filterdata.forEach(one => {
              if (one.Tickets === ticketElement && one.CompanyCode === locationElement) {
                this.filterArr.push(one);
              }
            });
          });
        });
        filteredValue = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filteredValue);
        this.sortPage();
      } else if (locationCount >= ticketCount) {
        locationFilter.forEach(locationElement => {
          ticketFilter.forEach(ticketElement => {
            this.filterdata.forEach(one => {
              if (one.CompanyCode === locationElement && one.Tickets === ticketElement) {
                this.filterArr.push(one);
              }
            });
          });
        });
        filteredValue = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filteredValue);
        this.sortPage();
      }
    }
  }
  sortPage() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
  }

  onRowSelected(row) {
    this.router.navigate(['/order-detail'], { queryParams: { orderId: row.OrderID } });
  }
  Completeclick() {
    this.Complete = false;
  }
  InCompleteclick() {
    this.InComplete = false;
  }
  Shippedclick() {
    this.Shipped = false;
  }
  Processedclick() {
    this.Processed = false;
  }
  Voidclick() {
    this.Void = false;
  }
  Holdclick() {
    this.Hold = false;
  }
  Releasedclick() {
    this.Released = false;
  }
  Committedclick() {
    this.Committed = false;
  }
  ComOrder() {
    this.notify = 'Complete';
    this.filterArr = [];
    if (this.notify.length === 0) {
      this.intializeDataValues();
    } else {
      this.listOfOrders.forEach(one => {
        if (one.StatusName === this.notify) {
          this.filterArr.push(one);
        }
        const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filterdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

    }
    this.checked.push(this.notify);


  }
  InComOrder() {
    this.notify = 'Incomplete';
    this.filterArr = [];
    if (this.notify.length === 0) {
      this.intializeDataValues();
    } else {
      this.listOfOrders.forEach(one => {
        if (one.StatusName === this.notify) {
          this.filterArr.push(one);
        }
        const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filterdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

    }

  }
  ReleasedOrder() {
    this.notify = 'Released';
    this.filterArr = [];
    if (this.notify.length === 0) {
      this.intializeDataValues();
    } else {
      this.listOfOrders.forEach(one => {
        if (one.StatusName === this.notify) {
          this.filterArr.push(one);
        }
        const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filterdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

    }

  }
  CommittedOrder() {
    this.notify = 'Committed';
    this.filterArr = [];
    if (this.notify.length === 0) {
      this.intializeDataValues();
    } else {
      this.listOfOrders.forEach(one => {
        if (one.StatusName === this.notify) {
          this.filterArr.push(one);
        }
        const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filterdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

    }

  }

  HoldOrder() {
    this.notify = 'Hold';
    this.filterArr = [];
    if (this.notify.length === 0) {
      this.intializeDataValues();
    } else {
      this.listOfOrders.forEach(one => {
        if (one.StatusName === this.notify) {
          this.filterArr.push(one);
        }
        const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filterdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

    }

  }
  ProcOrder() {
    this.notify = 'Processed';
    this.filterArr = [];
    if (this.notify.length === 0) {
      this.intializeDataValues();
    } else {
      console.log('---------notify----------', this.notify);
      this.listOfOrders.forEach(one => {
        if (one.StatusName === this.notify) {
          this.filterArr.push(one);
        }
        const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filterdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

    }

  }
  ShipOrder() {
    this.notify = 'Shipped';
    this.filterArr = [];
    if (this.notify.length === 0) {
      this.intializeDataValues();
    } else {
      console.log('---------notify----------', this.notify);
      this.listOfOrders.forEach(one => {
        if (one.StatusName === this.notify) {
          this.filterArr.push(one);
        }
        const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filterdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

    }

  }
  VoidOrder() {
    this.notify = 'Void';
    this.filterArr = [];
    if (this.notify.length === 0) {
      this.intializeDataValues();
    } else {
      console.log('---------notify----------', this.notify);
      this.listOfOrders.forEach(one => {
        if (one.StatusName === this.notify) {
          this.filterArr.push(one);
        }
        const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filterdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

    }

  }
  Dismiss() {
    this.Complete = false;
    this.InComplete = false;
    this.Shipped = false;
    this.Processed = false;
    this.Void = false;
    this.Hold = false;
    this.Committed = false;
    this.Released = false;
    if (this.loactionfiltervalue.length === 0 && this.ticketfiltervalue.length === 0 && this.statusfiltervalue.length === 0) {
      this.intializeDataValues();
    } else {
      this.filter();
    }
  }
}
