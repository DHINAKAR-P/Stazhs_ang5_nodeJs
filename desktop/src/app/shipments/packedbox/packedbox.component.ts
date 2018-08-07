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
  selector: 'app-packedbox',
  templateUrl: './packedbox.component.html',
  styleUrls: ['./packedbox.component.css']
})
export class PackedboxComponent implements OnInit {

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
  ShipmentId: any;
  Shipments: any;
  listPackedBoxes = [];

  private shipmentdata = [];

  displayedColumns = ['BoxCode', 'BoxNumber', 'Quantity'];
  // dataSource: MatTableDataSource<IOrders>;
  dataSource: any = [];

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
    this.router.navigate(['/packed-items'], { queryParams: { packedBoxId: row.PackedBoxID } });
  }
  Onclick() {
    this.router.navigate(['/shipments-tems'], { queryParams: { shipmentId: this.ShipmentId } });
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
        if (data === 'There is no PackedBox') {
          this.listPackedBoxes = [];
          this.dataSource = new MatTableDataSource(this.listPackedBoxes);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.OpenDialog();
        } else {
        console.log('data------------>', data);
        this.spinnerservice.hide();
        this.Shipments = data;
        this.listPackedBoxes = data.PackedBoxes;
        console.log('data------------>', this.listPackedBoxes);
        this.dataSource = new MatTableDataSource(this.listPackedBoxes);
        this.sortPage();
        }
      },
        error => {
          // console.log("error------->", error)
        });
  }
sortPage() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  this.dataSource.sortingDataAccessor = (item, property) => {
    switch (property) {
      case 'BoxCode': return item.BoxCode;
      case 'BoxNumber': return item.BoxNumber;
      case 'Quantity': return item.PackedUnits;
      default: return item[property];
    }
  };
}
  OpenDialog() {
    this.spinnerservice.hide();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = 'No Data in PackedBox ';
    const dialogRef = this.dailog.open(AlertDialogComponent, dialogConfig);
  }

}
