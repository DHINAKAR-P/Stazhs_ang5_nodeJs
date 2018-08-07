import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';

import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { IShipments } from '../IShipments';
declare var jquery: any;
import { ShipmentsService } from '../shipments.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlertDialogComponent } from '../../dialog/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-shipmentitems',
  templateUrl: './shipmentitems.component.html',
  styleUrls: ['./shipmentitems.component.css']
})
export class ShipmentitemsComponent implements OnInit {

  private listOfShipments: any[] = [];

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
  selectedLocation: any;

  listShipmentsItem: any;

  Shipments: any;

  ShipmentId: any;

  displayedColumns = ['ShipNumber', 'StyleNumber', 'StyleColor', 'GarmentSize', 'StyleOption', 'Quantity'];
  // dataSource: MatTableDataSource<IOrders>;
  dataSource: any = [];

  private shipmentdata = [];

  constructor(private spinnerservice: Ng4LoadingSpinnerService, private shipmentsService: ShipmentsService,
    private router: Router, private route: ActivatedRoute,
    private dailog: MatDialog) { }

  ngOnInit() {
    this.spinnerservice.show();
    this.getQueryDetails();

  }

  initializeValue() {
    this.dataSource = new MatTableDataSource(this.listOfShipments);
  }

  onRowSelected(row) {
    console.log('uuid valuda are -------> ', row);
    // this.router.navigate(['/packedboxes'], { queryParams: { uuid: row.uuid } });
    this.router.navigate(['/packedboxes'], { queryParams: { shipmentId: this.ShipmentId } });
  }

  getQueryDetails() {
    this.route.queryParams.subscribe(params => {
      const shipmentId = params['shipmentId'];
      this.ShipmentId = params['shipmentId'];
      console.log('uuid value are a------>', shipmentId);
      this.getShipments(shipmentId);
    });
  }

  getShipments(id) {
    this.shipmentsService.getShipments(id)
      .subscribe(data => {
        if (data === 'There is no Shipments') {
          this.listShipmentsItem = [];
          this.dataSource = new MatTableDataSource(this.listShipmentsItem);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.OpenDialog();
        }
        console.log('data------------>', data);
        this.Shipments = data;
        this.spinnerservice.hide();
        this.listShipmentsItem = data.ShipmentsItems;
        this.dataSource = new MatTableDataSource(this.listShipmentsItem);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
        error => {
          // console.log("error------->", error)
        });
  }

  OpenDialog() {
    this.spinnerservice.hide();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = 'No Data in ShipmentsItems';
    const dialogRef = this.dailog.open(AlertDialogComponent, dialogConfig);
  }


}
