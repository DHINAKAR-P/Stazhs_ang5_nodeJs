import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TicketCreationService } from '../ticket/ticketcreation/ticketcreation.service';
import * as Highcharts from 'highcharts';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DashboardService } from './dashboard.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  public loading = false;
  private userDetails: any;
  private allowedScreensList = '';
  private allowedScreens = [];
  private ticketlist = [];
  @Input()
  bufferValue = 50;

  displayedColumns = ['Ticket Id', 'Date', 'Status', 'Type'];
  dataSource: any = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private letsc = [];

  private selectedReport: string;

  private temp_var = true;

  private orderReceived: number;
  private orderReceivedPercent: number;
  private orderReceivedToday: number;
  private orderShipped: number;
  private orderShippedToday: number;
  private orderShippedPercent: number;

  private barGraphData = [];
  private barGraphDays = 7;
  private timeGraphDays = 7;

  private topSellingDays = 7;

  private ticketDays = 7;

  private onTimeDays = 7;
  private onTimeShipped = [];
  private onTimeForecasted = [];


  private timeGraphData: any;

  private barGraphDaysArr = [7, 30, 90];

  private timeGraphDaysArr = [7, 30, 90];

  private onTimeDaysArr = [7,   30, 90];

  private topSellingDaysArr = [7, 30, 90];

  private ticketDaysArr = [7, 30, 90];

  private dayGraph = [];
  private ForecastdayGraph = [];

  private onTimedayGraph = [];

  private topSelling = [];

  private showGraph = '';

  private orderOnTimeToday: number;
  private orderOnTimePercent: number;

  constructor(private router: Router, private dashboardService: DashboardService,private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.showGraph = 'received';
    this.orderReceivedToday = 0;
    this.orderShippedToday = 0;
    this.orderOnTimeToday = 0;
    this.getCurrentUserDetails();
    this.selectedReport = '00';
    const cookiedata = sessionStorage.getItem('currentUser');
    const json = JSON.parse(cookiedata);
    this.getreport_byuser();
    this.priorityticket();
    this.getOrdersReceived();
    this.getOrdersShipped();
    this.getTopSelling();
    this.onTime();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.allowedScreens.indexOf('Orders') > -1) {

      //  this.getBarGraph();
      this.barOrderReceived();

      this.timeGraph();

    }
  }

  getTopSelling() {

    this.dashboardService.get_ordersTopSelling(this.topSellingDays).subscribe(
      data => {
        this.topSelling = data;
        this.spinnerService.hide();
      }
    );
  
  }

  onRowSelected(row) {
    this.router.navigate(['/ticketdetails'], { queryParams: { uuid: row.uuid } });
    // this.router.navigate(['/tickets-details'], { queryParams: { uuid: id } });
  }

  onTime() {
    this.dashboardService.get_ordersOnTimeToday().subscribe(
      data => {
        this.orderOnTimeToday = data;
        this.dashboardService.get_ordersOnTime().subscribe(
          data2 => {
            this.orderOnTimePercent = data2;
          }
        );
      }
    );
  }

  getCurrentUserDetails() {
    const json = JSON.parse(sessionStorage.getItem('currentUser'));
    json.user.Authorities[0].role = json.user.Authorities[0].role.toLowerCase();
    this.userDetails = json.user;
    this.allowedScreensList = this.userDetails.Authorities[0].allowedScreens;
    this.allowedScreens = this.allowedScreensList.split(',');

    console.log('sidenav user details are ----- ', this.allowedScreens);
  }

  getreport_byuser() {
    this.loading = true;
  }

  selectedreport(report) {

  }

  displaychart(template_display) {

    template_display.forEach((item: any, index: any) => {

    });

    this.loading = false;
  }

  reportDetails(detailOfReport) {
    sessionStorage.setItem('reportdetail', detailOfReport.reportname);
    this.router.navigate(['/spldashboarddetail']);
  }

  priorityticket() {
    this.dashboardService.get_priority(this.ticketDays).subscribe(
      data => {
        console.log(data);
        this.ticketlist = data;
        this.dataSource = new MatTableDataSource(this.ticketlist);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }
    );
  }

  getOrdersReceived() {
    this.dashboardService.get_ordersReceived().subscribe(
      data => {
        this.orderReceived = data;
        this.dashboardService.get_ordersReceivedToday().subscribe(
          data2 => {
            //this.spinnerService.hide();
            this.orderReceivedToday = data2;
            const percent = (this.orderReceivedToday / this.orderReceived) * 100;
            if (percent.toString() === 'NaN') {
              this.orderReceivedPercent = 0;
            } else { this.orderReceivedPercent = Math.round(percent * 100) / 100; }
          }
        );
      }
    );
  }

  getOrdersShipped() {
    this.dashboardService.get_orderShipped().subscribe(
      data => {
        this.orderShipped = data;
        this.dashboardService.get_orderShippedToday().subscribe(
          data2 => {
            this.orderShippedToday = data2;
            const percent = (this.orderShippedToday / this.orderShipped) * 100;
            if (percent.toString() === 'NaN') {
              this.orderShippedPercent = 0;
            } else { console.log('percent 2-------->', percent); this.orderShippedPercent = Math.round(percent); }
          }
        );
      }
    );
  }


  getOrdersOnTime() {
    this.dashboardService.get_orderShipped().subscribe(
      data => {
        this.orderShipped = data;
        console.log('data----------1-->', data);
        this.dashboardService.get_orderShippedToday().subscribe(
          data2 => {
            this.orderShippedToday = data2;
            console.log('data----------2-->', data2);
            const percent = (this.orderShippedToday / this.orderShipped) * 100;
            if (percent.toString() === 'NaN') {
              this.orderShippedPercent = 0;
            } else { console.log('percent 2-------->', percent); this.orderShippedPercent = percent; }
          }
        );
      }
    );
  }


  barOrderShipped() {
    this.showGraph = 'shipped';

    if (this.barGraphDays.toString() === '7') {
      this.dayGraph = ['7', '6', '5', '4', '3', '2', '1'];
    }
    if (this.barGraphDays.toString() === '30') {
      this.dayGraph = ['30', '24', '20', '16', '12', '8', '4'];
    }

    if (this.barGraphDays.toString() === '90') {
      this.dayGraph = ['90', '75', '60', '45', '30', '15'];
    }

    this.dashboardService.get_barGraphDataShipped(this.barGraphDays).subscribe(
      data => {
        console.log('data----2---->', data);
        this.barGraphData = data;

        Highcharts.chart('container2', {
          chart: {
            backgroundColor:
            {
              linearGradient: [500, 500, 500, 0],
              stops: [
                [0, 'transparent'],
                [1, '#FFFFFF']
              ]
            },
            type: 'column',
            height: '80%'
          },
          title: {
            text: ''
          },
          legend: {
            align: 'center',
            verticalAlign: 'bottom',
            x: 0,
            y: 0,
          },
          xAxis: {
            title: {
              text: 'Days'
            },
            labels: {
              style: {
                color: 'gray'
              }
            },
            categories: this.dayGraph,
          },
          yAxis: {
            title: {
              text: ''
            },
            labels: {
              style: {
                color: 'gray'
              }
            },
          },
          tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            areaspline: {
              fillOpacity: 0.5
            }
          },
          series: [{
            name: 'No of orders',
            data: data
          }]
        });

      }
    );
  }


  barOrderReceived() {
    this.showGraph = 'received';
    console.log('dya-received------->', this.barGraphDays);

    if (this.barGraphDays.toString() === '7') {
      this.dayGraph = ['7', '6', '5', '4', '3', '2', '1'];
    }
    if (this.barGraphDays.toString() === '30') {
      this.dayGraph = ['30', '24', '20', '16', '12', '8', '4'];
    }

    if (this.barGraphDays.toString() === '90') {
      this.dayGraph = ['90', '75', '60', '45', '30', '15'];
    }

    this.dashboardService.get_barGraphData(this.barGraphDays).subscribe(
      data => {
        console.log('data-1------->', data);
        this.barGraphData = data;

        Highcharts.chart('container2', {
          chart: {
            backgroundColor:
            {
              linearGradient: [500, 500, 500, 0],
              stops: [
                [0, 'transparent'],
                [1, '#FFFFFF']
              ]
            },
            type: 'column',
            height: '80%'
          },
          title: {
            text: ''
          },
          legend: {
            align: 'center',
            verticalAlign: 'bottom',
            x: 0,
            y: 0,
          },
          xAxis: {
            title: {
              text: 'Days'
            },
            labels: {
              style: {
                color: 'gray'
              }
            },
            categories: this.dayGraph
          },
          yAxis: {
            title: {
              text: ''
            },
            labels: {
              style: {
                color: 'gray'
              }
            },
          },
          tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            areaspline: {
              fillOpacity: 0.5
            }
          },
          series: [{
            name: 'No of orders',
            data: data
          }]
        });

      }
    );
  }


  timeGraph() {

    if (this.timeGraphDays.toString() === '7') {
      this.ForecastdayGraph = ['1', '2', '3', '4', '5', '6', '7'];
    }
    if (this.timeGraphDays.toString() === '30') {
      this.ForecastdayGraph = ['4', '8', '12', '16', '20', '24', '30'];
    }

    if (this.timeGraphDays.toString() === '90') {
      this.ForecastdayGraph = ['15', '30', '45', '60', '75', '90'];
    }

    this.dashboardService.get_timeGraphData(this.timeGraphDays).subscribe(
      data => {
        //this.spinnerService.hide();
        console.log('data-time------->', data);
        if (this.timeGraphDays.toString() === '90') {
          data.Actual.splice(-1, 1);
          data.Forecasted.splice(-1, 1);
        }

        Highcharts.chart('container3', {
          chart: {
            backgroundColor:
            {
              linearGradient: [500, 500, 500, 0],
              stops: [
                [0, 'transparent'],
                [1, '#FFFFFF']
              ]
            },
            type: 'spline',
            height: '80%'
          },
          title: {
            text: ''
          },
          subtitle: {
            text: 'Time Line'
          },
          xAxis: {
            type: 'datetime',
            // dateTimeLabelFormats: {
            //   month: '%e. %b',
            //   year: '%b'
            // },
            title: {
              text: 'Date'
            },
            labels: {
              style: {
                color: 'gray'
              }
            },
            categories: this.ForecastdayGraph
          },
          yAxis: {
            title: {
              text: 'Orders'
            },
            min: 0,
            labels: {
              style: {
                color: 'gray'
              }
            },
          },
          tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            // pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
          },

          plotOptions: {
            spline: {
              marker: {
                enabled: true
              }
            }
          },

          series: [{
            name: 'Actual',

            data: data.Actual
          },
          {
            name: 'Forcast',

            data: data.Forecasted
          }
          ]
        });


      });


  }

  onTimeGraph() {
    this.showGraph = 'ontime';

    if (this.onTimeDays.toString() === '7') {
      this.onTimedayGraph = ['7', '6', '5', '4', '3', '2', '1'];
    }
    if (this.onTimeDays.toString() === '30') {
      this.onTimedayGraph = ['30', '24', '20', '16', '12', '8', '4'];
    }

    if (this.onTimeDays.toString() === '90') {
      this.onTimedayGraph = ['90', '75', '60', '45', '30', '15'];
    }

    this.dashboardService.get_ordersOnTimeShipped(this.onTimeDays).subscribe(
      data => {

        this.onTimeShipped = data;

        this.dashboardService.get_ordersOnTimeForecast(this.onTimeDays).subscribe(
          data2 => {

            this.onTimeForecasted = data2;

                  Highcharts.chart('container2', {
                    chart: {
                      type: 'column',
                      height: '80%',
                      backgroundColor:
                      {
                        linearGradient: [500, 500, 500, 0],
                        stops: [
                          [0, 'transparent'],
                          [1, '#FFFFFF']
                        ]
                      },
                    },
                    title: {
                      text: ''
                    },
                    xAxis: {
                      categories: this.onTimedayGraph,
                      crosshair: true,
                      title: {
                        text: 'Days'
                      },
                    },
                    yAxis: {
                      min: 0,
                      title: {
                        text: 'Orders'
                      }
                    },
                    tooltip: {
                      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y}</b></td></tr>',
                      footerFormat: '</table>',
                      shared: true,
                      useHTML: true
                    },
                    plotOptions: {
                      column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                      }
                      // series: {
                      //   color: '#64b448'
                      // }
                    },
                    series: [{
                      name: 'Total Shipped',
                      data: this.onTimeShipped,
                      color: '#64b448'

                    }, {
                      name: 'Total Forecasted',
                      data: this.onTimeForecasted

                    }]
                  });

                });
              });

  }

}
