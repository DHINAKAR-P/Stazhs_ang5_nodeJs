import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITickets } from './ITickets';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { TicketService } from './ticket.service';
import { FormControl } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlertDialogComponent } from '../../dialog/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit, AfterViewInit {

  private filter_ticketCreated_By: string[];
  private filter_ticketAssigned_To: string[];
  private filter_ticketStatus: string[];
  private filter_ticketOrganization: string[];
  private filterArr: any[];
  selectfilter = new FormControl();
  // tslint:disable-next-line:member-ordering
  public name: any[];
  // tslint:disable-next-line:member-ordering
  public failure: any;
  // tslint:disable-next-line:member-ordering
  public successmessage: any;
  // tslint:disable-next-line:member-ordering
  public failuremessage: any;
  private orgUUID;
  organizationname: String;
  private showOrgFilter: boolean;
  private showArrayObject: any[] = [];
  // private singleObject: {
  //   uuid: '',
  //   Date: '',
  //   orderNumberList: any,
  //   createdByName; '',
  //   assignedToName: '',
  //   type: '',
  //   status: ''
  // };
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private ticketDetails: ITickets[] = [];
  // private selectedValue;
  private orgSelectedValue: String[] = [];
  private createdBySelectedValue: String[] = [];
  private statusSelectedValue: String[] = [];
  private assignedTOselectedValue: String[] = [];
  private listOfTickets = [];
  private ITickets: ITickets = {
    'id': 0,
    'Date': '',
    'Order_number': 0,
    'Created_By': '',
    'Assigned_To': '',
    'Type': '',
    'Status': ''
  };
  private description: any = {
    'text': '',
    'number': '',
    'ordernumber': '',
    'date': '',
    'created': '',
    'assigned': ''
  };
  private searchtext: any;
  private search: any;
  private orgvalue: any;
  private createdvalue: any;
  private assignedvalue: any;
  private statusvalue: any;
  private filterassignedname: any;
  displayedColumns = ['Id', 'PONumber', 'Date', 'Order_number', 'Created_By', 'organization', 'Assigned_To', 'Type', 'Status'];
  dataSource: any = [];


  constructor(private spinnerservice: Ng4LoadingSpinnerService,
    private ticketService: TicketService, private router: Router, private dailog: MatDialog) {
    if (JSON.parse(sessionStorage.getItem('currentUser')).user.organization !== null) {
      this.orgUUID = JSON.parse(sessionStorage.getItem('currentUser')).user.organization.uuid;
      this.organizationname = JSON.parse(sessionStorage.getItem('currentUser')).user.organization.organizationname;
    }
  }

  ngOnInit() {
    this.search = false;
    this.spinnerservice.show();
    console.log('org name------->', this.organizationname);
    if (this.organizationname === undefined) {
      this.getAllAdminTicket();
    } else {
      this.getAllTicket();
    }
  }
  ngAfterViewInit(): void {
  }

  getAllAdminTicket() {
    this.ticketService.getAllTicket().subscribe(
      data => {
        if (data === 'There is no Tickets') {
          this.listOfTickets = [];
          this.OpenDialog();
        } else {
          // this.success = true;
          this.successmessage = '   Your List Of Tickets is Displayed';
          // this.listOfTickets = data;
          data.forEach(element => {
            if (element.organization !== null) {
              this.listOfTickets.push(element);
            }
          });
          this.spinnerservice.hide();
          this.filter_ticketCreated_By = Array.from(new Set(this.listOfTickets.map((itemInArray) => itemInArray.created_by.firstname)));
          const arrayOfAssignedUser = Array.from(new Set(this.listOfTickets.map((itemInArray) =>
            itemInArray.assigned_to.map((InsideArray) => InsideArray.firstname))));
          const listOfNames = [];
          arrayOfAssignedUser.forEach(element => {
            console.log('entering into filter ------- ', element.length);
            for (let i = 0; i < element.length; i++) {
              if (listOfNames.indexOf(element[i]) > -1) {

              } else {
                listOfNames.push(element[i]);
              }
            }
          });
          this.filter_ticketAssigned_To = listOfNames;
          console.log('testing filter in ticket assigned are --------- ', this.filter_ticketAssigned_To);
          this.filter_ticketStatus = Array.from(new Set(this.listOfTickets.map((customerArray => customerArray.Status))));
          this.filter_ticketOrganization = Array.from(new Set(this.listOfTickets.map((itemInArray) =>
            itemInArray.organization.organizationname)));
          // filter
          this.filter_ticketAssigned_To = this.filter_ticketAssigned_To.filter((obj) => obj.length > 0);
          this.filter_ticketCreated_By = this.filter_ticketCreated_By.filter((obj) => obj.length > 0);
          this.filter_ticketStatus = this.filter_ticketStatus.filter((obj) => obj.length > 0);
          this.filter_ticketOrganization = this.filter_ticketOrganization.filter((obj) => obj.length > 0);
          this.showOrgFilter = true;
          this.showTableData();
        }
      },
      error => {
        this.failure = true;
        this.failuremessage = 'This Tickets  is now delayed';
        console.log('something went wrong');
      }
    );
  }

  getAllTicket() {
    this.name = [];
    if (this.organizationname !== 'Stahls') {
      this.ticketService.getAllTicketByOrg(this.orgUUID).subscribe(
        data => {
          if (data === 'There is no Tickets') {
            this.listOfTickets = [];
            this.OpenDialog();
          } else {
            console.log('get all ticket data are 1---- ', data);
            this.spinnerservice.hide();
            // this.success = true;
            this.successmessage = '   Your List Of Tickets is Displayed';
            this.listOfTickets = data;
            this.filter_ticketCreated_By = Array.from(new Set(this.listOfTickets.map((itemInArray) => itemInArray.created_by.firstname)));
            // tslint:disable-next-line:max-line-length
            // this.filter_ticketAssigned_To = Array.from(new Set(this.listOfTickets.map((itemInArray) => itemInArray.assigned_to ? itemInArray.assigned_to.firstname : '')));
            // tslint:disable-next-line:max-line-length
            this.listOfTickets.forEach(element => {
              element.assigned_to.forEach(element1 => {
                this.name.push(element1.firstname);
              });
              // tslint:disable-next-line:max-line-length
              this.filter_ticketAssigned_To = Array.from(new Set(this.name.map((itemInArray) => itemInArray)));
            });
            console.log('---------------Name--------------', this.listOfTickets.map((itemInArray) => itemInArray.assigned_to));
            this.filter_ticketStatus = Array.from(new Set(this.listOfTickets.map((customerArray => customerArray.Status))));
            this.filter_ticketOrganization = Array.from(new Set(this.listOfTickets.map((itemInArray) =>
              itemInArray.organization.organizationname)));
            // filter
            // this.filter_ticketAssigned_To = this.filter_ticketAssigned_To.filter((obj) => obj.length > 0);
            this.filter_ticketCreated_By = this.filter_ticketCreated_By.filter((obj) => obj.length > 0);
            this.filter_ticketStatus = this.filter_ticketStatus.filter((obj) => obj.length > 0);
            this.filter_ticketOrganization = this.filter_ticketOrganization.filter((obj) => obj.length > 0);
            this.showOrgFilter = false;
            this.showTableData();
          }
        },
        error => {
          this.failure = true;
          this.failuremessage = 'This Tickets  is now delayed';
          console.log('something went wrong');
        }
      );
    } else {
      this.ticketService.getAllTicket().subscribe(
        data => {
          if (data === 'There is no Tickets') {
            this.listOfTickets = [];
            this.OpenDialog();
          } else {
            // this.success = true;
            this.successmessage = '   Your List Of Tickets is Displayed';
            // this.listOfTickets = data;

            data.forEach(element => {
              if (element.organization !== null) {
                this.listOfTickets.push(element);
              }
            });
            this.spinnerservice.hide();
            console.log('get all tick---->', data);
            this.filter_ticketCreated_By = Array.from(new Set(this.listOfTickets.map((itemInArray) => itemInArray.created_by.firstname)));
            const arrayOfAssignedUser = Array.from(new Set(this.listOfTickets.map((itemInArray) =>
              itemInArray.assigned_to.map((InsideArray) => InsideArray.firstname))));
            const listOfNames = [];
            arrayOfAssignedUser.forEach(element => {
              console.log('entering into filter ------- ', element.length);
              for (let i = 0; i < element.length; i++) {
                if (listOfNames.indexOf(element[i]) > -1) {

                } else {
                  listOfNames.push(element[i]);
                }
              }
            });
            this.filter_ticketOrganization = Array.from(new Set(this.listOfTickets.map((itemInArray) =>
              itemInArray.organization.organizationname)));
            this.filter_ticketAssigned_To = listOfNames;
            console.log('testing filter in ticket assigned are --------- ', this.filter_ticketAssigned_To);
            this.filter_ticketStatus = Array.from(new Set(this.listOfTickets.map((customerArray => customerArray.Status))));
            // filter
            this.filter_ticketAssigned_To = this.filter_ticketAssigned_To.filter((obj) => obj.length > 0);
            this.filter_ticketCreated_By = this.filter_ticketCreated_By.filter((obj) => obj.length > 0);
            this.filter_ticketStatus = this.filter_ticketStatus.filter((obj) => obj.length > 0);
            this.filter_ticketOrganization = this.filter_ticketOrganization.filter((obj) => obj.length > 0);
            this.showTableData();
            this.showOrgFilter = true;
          }
        },
        error => {
          this.failure = true;
          this.failuremessage = 'This Tickets  is now delayed';
          console.log('something went wrong');
        }
      );
    }
  }

  showTableData() {
    console.log('ticket shows are ------>>>>> ', this.listOfTickets);
    this.listOfTickets.forEach(element => {
      const singleObject = {
        uuid: '',
        id: element.id,
        Date: '',
        orderNumberList: [],
        Company: '',
        createdByName: '',
        assignedToName: [],
        type: '',
        status: '',
        PONumberList: [],
        Description: ''
      };
      singleObject.uuid = element.uuid;
      singleObject.Date = element.Date;
      singleObject.Description = element.description;
      if (element.salesorder.length === 0) {
        singleObject.orderNumberList = [];
      } else {
        for (let i = 0; i < element.salesorder.length; i++) {
          // singleObject.orderNumberList = element.salesorder[i].uuid;
          singleObject.orderNumberList.push(element.salesorder[i].OrderNumber);
        }
      }
      if (element.salesorder.length === 0) {
        singleObject.PONumberList = [];
      } else {
        for (let i = 0; i < element.salesorder.length; i++) {
          singleObject.PONumberList.push(element.salesorder[i].PONumber);
        }
      }
      singleObject.createdByName = element.created_by.firstname;
      if (element.assigned_to.length > 0) {
        for (let i = 0; i < element.assigned_to.length; i++) {
          singleObject.assignedToName.push(element.assigned_to[i].firstname);
        }
        // singleObject.assignedToName = element.assigned_to.firstname;
      }
      if (element.organizationUuid != null) {
        singleObject.Company = element.organization.organizationname;
      }
      singleObject.type = element.Type;
      singleObject.status = element.Status;
      this.showArrayObject.push(singleObject);
    });

    this.dataSource = new MatTableDataSource(this.showArrayObject);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'Id': return item.id;
        case 'Date': return item.Date;
        case 'Order_number': return item.orderNumberList;
        case 'Created_By': return item.createdByName.toLowerCase();
        case 'organization': return item.Company.toLowerCase();
        case 'Assigned_To': return item.assignedToName;
        case 'Type': return item.type.toLowerCase();
        case 'Status': return item.status.toLowerCase();
        case 'PONumber': return item.PONumberList;
        default: return item[property];
      }
    };
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    console.log('-----------------------', this.dataSource.filter);
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
    dialogConfig.data = 'No Data in Tickets';
    const dialogRef = this.dailog.open(AlertDialogComponent, dialogConfig);
  }

  organizationFilter() {
    this.orgSelectedValue = this.selectfilter.value;
    this.FilterDetails();
  }
  createByFilter() {
    this.createdBySelectedValue = this.selectfilter.value;
    this.FilterDetails();
  }
  assignedToFilter() {
    this.assignedTOselectedValue = this.selectfilter.value;
    this.FilterDetails();

  }
  statusFilter() {
    this.statusSelectedValue = this.selectfilter.value;
    this.FilterDetails();
  }

  Descriptionsearch(value: String) {
    this.searchtext = value;
    this.filterArr = [];
    value = value.toLowerCase();
    this.showArrayObject.forEach(one => {
      const descriptiontext = one.Description.toLowerCase();
      if (descriptiontext.includes(value)) {
        this.filterArr.push(one);
        console.log('-------filter----------', this.filterArr);
      }
      const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
      this.dataSource = new MatTableDataSource(filterdata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  Ponumbersearch(value: String) {
    this.searchtext = value;
    this.filterArr = [];
    value = value.toString();
    console.log('--------------', value);
    if (value === '') {
      this.initializeValue();
    }
    if (value !== '') {
      this.showArrayObject.forEach(one => {
        one.PONumberList.forEach(number => {
          if (number.toString() === value) {
            this.filterArr.push(one);
            console.log('-------filter----------', this.filterArr);
          }
        });
        const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filterdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }
  Ordernumbersearch(value: String) {
    this.searchtext = value;
    this.filterArr = [];
    value = value;
    console.log('--------------', value);
    if (value === '') {
      this.initializeValue();
    }
    if (value !== '') {
      this.showArrayObject.forEach(one => {
        one.orderNumberList.forEach(number => {
          const ordernumber = number;
          if (ordernumber.toString() === value.toString()) {
            this.filterArr.push(one);
            console.log('-------filter----------', this.filterArr);
          }
        });
        const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filterdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

    }
  }
  datesearch(filterValue: String) {
    this.searchtext = filterValue;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    console.log('-----------------------', this.dataSource.filter);
  }

  createdbysearch(value: String) {
    this.searchtext = value;
    this.filterArr = [];
    value = value.toLowerCase();
    console.log('--------------', value);
    if (value === '') {
      this.initializeValue();
    }
    if (value !== '') {
      this.showArrayObject.forEach(one => {
        const name = one.createdByName.toLowerCase();
        console.log('--------date----------', name);
        if (name.includes(value)) {
          this.filterArr.push(one);
          console.log('-------filter----------', this.filterArr);
        }
        const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filterdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }
  assignedtosearch(value: String) {
    this.searchtext = value;
    this.filterArr = [];
    value = value.toLowerCase();
    console.log('--------------', value);
    if (value === '') {
      this.initializeValue();
    }
    if (value !== '') {
      this.showArrayObject.forEach(one => {
        one.assignedToName.forEach(name => {
          const assigned_to = name.toLowerCase();
          if (assigned_to.includes(value)) {
            this.filterArr.push(one);
            console.log('-------filter----------', this.filterArr);
          }
        });
        const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filterdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

    }
  }


  FilterDetails() {
    this.filterArr = [];
    this.assignedvalue = [];
    this.createdvalue = [];
    this.statusvalue = [];
    this.orgvalue = [];
    if (this.orgSelectedValue.length === 0 && this.createdBySelectedValue.length === 0 &&
      this.assignedTOselectedValue.length === 0 && this.statusSelectedValue.length === 0) {
      this.initializeValue();
    }
    /* The below condition is for filter two value which is organization and created by */
    if (this.orgSelectedValue.length !== 0 && this.createdBySelectedValue.length !== 0 &&
      this.assignedTOselectedValue.length === 0 && this.statusSelectedValue.length === 0) {
      this.orgSelectedValue.forEach(element => {
        this.orgvalue.push(element);
      });
      this.createdBySelectedValue.forEach(element => {
        this.createdvalue.push(element);
      });
      this.showArrayObject.forEach(one => {
        this.orgvalue.forEach(organize => {
          this.createdvalue.forEach(created => {
            if (one.Company === organize && one.createdByName === created) {
              this.filterArr.push(one);
              console.log('---------twovalue---------', this.filterArr);
            }
          });
        });
        const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filterdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
      this.Tablesort();
    }
    /* The below condition is for filtering three value organization,created by,assigned to */
    if (this.orgSelectedValue.length !== 0 && this.createdBySelectedValue.length !== 0 &&
      this.assignedTOselectedValue.length !== 0 && this.statusSelectedValue.length === 0) {
      this.orgSelectedValue.forEach(element => {
        this.orgvalue.push(element);
      });
      this.createdBySelectedValue.forEach(element => {
        this.createdvalue.push(element);
      });
      this.assignedTOselectedValue.forEach(element => {
        this.assignedvalue.push(element);
      });
      this.showArrayObject.forEach(one => {
        one.assignedToName.forEach(element2 => {
          this.orgvalue.forEach(organize => {
            this.createdvalue.forEach(created => {
              this.assignedvalue.forEach(name => {
                if (one.Company === organize && one.createdByName === created && element2 === name) {
                  this.filterArr.push(one);
                  console.log('---------threevalue---------', this.filterArr);
                }
              });
            });
          });
        });
        const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filterdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
      this.Tablesort();
    }
    /* The below condition is for filtering three value status,created by,assigned to */
    if (this.statusSelectedValue.length !== 0 && this.createdBySelectedValue.length !== 0 &&
      this.assignedTOselectedValue.length !== 0 && this.orgSelectedValue.length === 0) {
      this.statusSelectedValue.forEach(element => {
        this.statusvalue.push(element);
      });
      this.createdBySelectedValue.forEach(element => {
        this.createdvalue.push(element);
      });
      this.assignedTOselectedValue.forEach(element => {
        this.assignedvalue.push(element);
      });
      this.showArrayObject.forEach(one => {
        one.assignedToName.forEach(element2 => {
          this.statusvalue.forEach(status => {
            this.createdvalue.forEach(created => {
              this.assignedvalue.forEach(name => {
                if (one.status === status && one.createdByName === created && element2 === name) {
                  this.filterArr.push(one);
                  console.log('---------threevalue---------', this.filterArr);
                }
              });
            });
          });
        });
        const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filterdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
      this.Tablesort();
    }
    /* The below filter is for filerting two value which is Organization and assigned to  */
    if (this.orgSelectedValue.length !== 0 && this.assignedTOselectedValue.length !== 0 &&
      this.createdBySelectedValue.length === 0 && this.statusSelectedValue.length === 0) {
      this.orgSelectedValue.forEach(element => {
        this.orgvalue.push(element);
      });
      this.assignedTOselectedValue.forEach(element => {
        this.assignedvalue.push(element);
      });
      this.showArrayObject.forEach(one => {
        one.assignedToName.forEach(element2 => {
          this.orgvalue.forEach(organize => {
            this.assignedvalue.forEach(name => {
              if (one.Company === organize && element2 === name) {
                this.filterArr.push(one);
                console.log('---------twovalue1---------', this.filterArr);
              }
            });
          });
        });
        const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filterdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
      this.Tablesort();
    }
    /* The below filter is for filerting two value which is created by and assigned to  */
    if (this.createdBySelectedValue.length !== 0 && this.assignedTOselectedValue.length !== 0 &&
      this.statusSelectedValue.length === 0 && this.orgSelectedValue.length === 0) {
      this.createdBySelectedValue.forEach(element => {
        this.createdvalue.push(element);
      });
      this.assignedTOselectedValue.forEach(element => {
        this.assignedvalue.push(element);
      });
      this.showArrayObject.forEach(one => {
        one.assignedToName.forEach(element2 => {
          this.createdvalue.forEach(create => {
            this.assignedvalue.forEach(name => {
              if (one.createdByName === create && element2 === name) {
                this.filterArr.push(one);
                console.log('---------twovalue2---------', this.filterArr);
              }
            });
          });
        });
        const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filterdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
      this.Tablesort();
    }
    /* The below filter is for filerting two value which is created by and status  */
    if (this.createdBySelectedValue.length !== 0 && this.statusSelectedValue.length !== 0 &&
      this.assignedTOselectedValue.length === 0 && this.orgSelectedValue.length === 0) {
      this.createdBySelectedValue.forEach(element => {
        this.createdvalue.push(element);
      });
      this.statusSelectedValue.forEach(element => {
        this.statusvalue.push(element);
      });
      this.showArrayObject.forEach(one => {
        this.createdvalue.forEach(created => {
          this.statusvalue.forEach(status => {
            if (one.createdByName === created && one.status === status) {
              this.filterArr.push(one);
              console.log('---------towvalue3---------', this.filterArr);
            }
          });
        });
        const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filterdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
      this.Tablesort();
    }
    /* The below filter is for filerting two value which is assigned to and status  */
    if (this.assignedTOselectedValue.length !== 0 && this.statusSelectedValue.length !== 0
      && this.orgSelectedValue.length === 0 && this.createdBySelectedValue.length === 0) {
      this.assignedTOselectedValue.forEach(element => {
        this.assignedvalue.push(element);
      });
      this.statusSelectedValue.forEach(element => {
        this.statusvalue.push(element);
      });
      this.showArrayObject.forEach(one => {
        one.assignedToName.forEach(element2 => {
          this.assignedvalue.forEach(name => {
            this.statusvalue.forEach(status => {
              if (element2 === name && one.status === status) {
                this.filterArr.push(one);
                console.log('---------twovalue4---------', this.filterArr);
              }
            });
          });
        });
        const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filterdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
      this.Tablesort();
    }
    /* The below filter is for filerting two value which is organization and status  */
    if (this.statusSelectedValue.length !== 0 && this.orgSelectedValue.length !== 0 &&
      this.createdBySelectedValue.length === 0 && this.assignedTOselectedValue.length === 0) {
      this.statusSelectedValue.forEach(element => {
        this.statusvalue.push(element);
      });
      this.orgSelectedValue.forEach(element => {
        this.orgvalue.push(element);
      });
      this.showArrayObject.forEach(one => {
        this.statusvalue.forEach(status => {
          this.orgvalue.forEach(organize => {
            if (one.status === status && one.Company === organize) {
              this.filterArr.push(one);
              console.log('---------twovalue5---------', this.filterArr);
            }
          });
        });
        const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filterdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
      this.Tablesort();
    }
    /* The below filter is for filerting four value which is organization,created by,assigned to and status  */
    if (this.orgSelectedValue.length !== 0 && this.createdBySelectedValue.length !== 0 &&
      this.assignedTOselectedValue.length !== 0 && this.statusSelectedValue.length !== 0) {
      this.orgSelectedValue.forEach(element => {
        this.orgvalue.push(element);
      });
      this.createdBySelectedValue.forEach(element => {
        this.createdvalue.push(element);
      });
      this.assignedTOselectedValue.forEach(element => {
        this.assignedvalue.push(element);
      });
      this.statusSelectedValue.forEach(element => {
        this.statusvalue.push(element);
      });
      this.showArrayObject.forEach(one => {
        one.assignedToName.forEach(element2 => {
          this.orgvalue.forEach(organize => {
            this.createdvalue.forEach(created => {
              this.assignedvalue.forEach(name => {
                this.statusvalue.forEach(status => {
                  if (one.Company === organize && one.createdByName === created && element2 === name && one.status === status) {
                    this.filterArr.push(one);
                    console.log('---------fourvalue---------', this.filterArr);
                  }
                });
              });
            });
          });
        });
        const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
        this.dataSource = new MatTableDataSource(filterdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
      this.Tablesort();
    }
    /* The below filter is for filerting single value which is organization,created by,assigned to and status  */
    if (this.orgSelectedValue.length !== 0 && this.createdBySelectedValue.length === 0 &&
      this.assignedTOselectedValue.length === 0 && this.statusSelectedValue.length === 0) {
      this.orgSelectedValue.forEach(element => {
        this.showArrayObject.forEach(one => {
          if (one.Company === element) {
            this.filterArr.push(one);
            console.log('---------signle---------', this.filterArr);
          }
          const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
          this.dataSource = new MatTableDataSource(filterdata);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      });
      this.Tablesort();
    }
    if (this.createdBySelectedValue.length !== 0 && this.orgSelectedValue.length === 0 &&
      this.assignedTOselectedValue.length === 0 && this.statusSelectedValue.length === 0) {
      this.createdBySelectedValue.forEach(element => {
        this.showArrayObject.forEach(one => {
          if (one.createdByName === element) {
            this.filterArr.push(one);
            console.log('---------single1---------', this.filterArr);
          }
          const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
          this.dataSource = new MatTableDataSource(filterdata);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      });
      this.Tablesort();
    }
    if (this.statusSelectedValue.length !== 0 && this.createdBySelectedValue.length === 0 &&
      this.orgSelectedValue.length === 0 && this.assignedTOselectedValue.length === 0) {
      this.statusSelectedValue.forEach(element => {
        this.showArrayObject.forEach(one => {
          if (one.status === element) {
            this.filterArr.push(one);
            console.log('---------single2---------', this.filterArr);
          }
          const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
          this.dataSource = new MatTableDataSource(filterdata);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      });
      this.Tablesort();
    }
    if (this.assignedTOselectedValue.length !== 0 && this.statusSelectedValue.length === 0 &&
      this.createdBySelectedValue.length === 0 && this.orgSelectedValue.length === 0) {
      this.assignedTOselectedValue.forEach(element => {
        this.showArrayObject.forEach(one => {
          one.assignedToName.forEach(element2 => {
            // this.filterassignedname.push(element2);
            if (element2 === element) {
              this.filterArr.push(one);
              console.log('---------single3---------', this.filterArr);
            }

          });
          // if (this.filterassignedname === element) {
          //   this.filterArr.push(one);
          //   console.log('---------single3---------', this.filterArr);
          // }
          const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
          this.dataSource = new MatTableDataSource(filterdata);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      });
      this.Tablesort();
    }

    // if (this.orgSelectedValue.length !== 0) {
    //   this.orgSelectedValue.forEach(element => {

    //     this.showArrayObject.forEach(one => {
    //       if (one.Company === element) {
    //         this.filterArr.push(one);
    //       }
    //       const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
    //       this.dataSource = new MatTableDataSource(filterdata);
    //       this.dataSource.paginator = this.paginator;
    //       this.dataSource.sort = this.sort;
    //     });

    //   });
    // }
    // if (this.createdBySelectedValue.length !== 0) {
    //   this.createdBySelectedValue.forEach(element => {

    //     this.showArrayObject.forEach(one => {
    //       if (one.createdByName === element) {
    //         this.filterArr.push(one);
    //       }
    //       const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
    //       this.dataSource = new MatTableDataSource(filterdata);
    //       this.dataSource.paginator = this.paginator;
    //       this.dataSource.sort = this.sort;
    //     });

    //   });
    // }
    // if (this.assignedTOselectedValue.length !== 0) {
    //   this.assignedTOselectedValue.forEach(element => {

    //     this.showArrayObject.forEach(one => {
    //       if (one.assignedToName.indexOf(element) > -1) {
    //         this.filterArr.push(one);
    //       }
    //       const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
    //       this.dataSource = new MatTableDataSource(filterdata);
    //       this.dataSource.paginator = this.paginator;
    //       this.dataSource.sort = this.sort;
    //     });

    //   });
    // }
    // if (this.statusSelectedValue.length !== 0) {
    //   this.statusSelectedValue.forEach(element => {

    //     this.showArrayObject.forEach(one => {
    //       if (one.status === element) {
    //         this.filterArr.push(one);
    //       }
    //       const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
    //       this.dataSource = new MatTableDataSource(filterdata);
    //       this.dataSource.paginator = this.paginator;
    //       this.dataSource.sort = this.sort;
    //     });

    //   });
    // }

  }
  Tablesort() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'Id': return item.id;
        case 'Date': return item.Date;
        case 'Order_number': return item.orderNumberList;
        case 'Created_By': return item.createdByName.toLowerCase();
        case 'organization': return item.Company.toLowerCase();
        case 'Assigned_To': return item.assignedToName;
        case 'Type': return item.type.toLowerCase();
        case 'Status': return item.status.toLowerCase();
        case 'PONumber': return item.PONumberList;
        default: return item[property];
      }
    };
  }
  initializeValue() {
    this.dataSource = new MatTableDataSource(this.showArrayObject);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'Id': return item.id;
        case 'Date': return item.Date;
        case 'Order_number': return item.orderNumberList;
        case 'Created_By': return item.createdByName.toLowerCase();
        case 'organization': return item.Company.toLowerCase();
        case 'Assigned_To': return item.assignedToName;
        case 'Type': return item.type.toLowerCase();
        case 'Status': return item.status.toLowerCase();
        case 'PONumber': return item.PONumberList;
        default: return item[property];
      }
    };

  }
  onRowSelected(row) {
    this.router.navigate(['/ticketdetails'], { queryParams: { uuid: row.uuid } });
    // this.router.navigate(['/tickets-details'], { queryParams: { uuid: id } });
  }
  searchmodel() {
    this.search = !this.search;
  }
}
