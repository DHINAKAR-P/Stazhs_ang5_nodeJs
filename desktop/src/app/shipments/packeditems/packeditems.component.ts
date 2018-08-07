import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';

import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { IShipments } from '../IShipments';
declare var jquery: any;
import { ShipmentsService } from '../shipments.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlertDialogComponent } from '../../dialog/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-packeditems',
  templateUrl: './packeditems.component.html',
  styleUrls: ['./packeditems.component.css']
})
export class PackeditemsComponent implements OnInit {

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
  packedboxnumber: any;
  selectedLocation: any;
  PackedBox: any;
  listPackedBoxItem: any;

  displayedColumns = ['PackedItemID', 'StyleNumber', 'StyleColor', 'GarmentSize', 'StyleOption', 'Quantity'];
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
    // this.router.navigate(['/shipments-tems'], { queryParams: { uuid: row.uuid } });
  }
  Onclick() {
    this.router.navigate(['/packedboxes'], { queryParams: { shipmentId: this.packedboxnumber } });
    console.log('uuid value are a------>', this.packedboxnumber);
  }
  Onclick1() {
    this.router.navigate(['/shipments-tems'], { queryParams: { shipmentId: this.packedboxnumber } });
    console.log('uuid value are a------>', this.packedboxnumber);
  }

  getQueryDetails() {
    this.route.queryParams.subscribe(params => {
      const packedBoxId = params['packedBoxId'];
      // this.packedboxnumber = params['packedBoxId'];
      console.log('uuid value are a------>', packedBoxId);
      this.getPackedbox(packedBoxId);
    });
  }

  getPackedbox(id) {
    this.shipmentsService.getPackedBox(id)
      .subscribe(data => {
        if (data === 'There is no PackedBox') {
          this.listPackedBoxItem = [];
          this.dataSource = new MatTableDataSource(this.listPackedBoxItem);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        }
        console.log('data------------>', data.ShipmentID);
        this.spinnerservice.hide();
        this.packedboxnumber = data.ShipmentID;
        this.PackedBox = data;
        this.listPackedBoxItem = data.PackedItems;
        this.dataSource = new MatTableDataSource(this.listPackedBoxItem);
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
    dialogConfig.data = 'No Data in PackedBoxItems';
    const dialogRef = this.dailog.open(AlertDialogComponent, dialogConfig);
  }


}
