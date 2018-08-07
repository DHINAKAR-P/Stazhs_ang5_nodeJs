import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPurchaseDetail } from './IPurchaseDetail';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { PurchaseDetailService } from './purchase-detail.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.css']
})
export class PurchaseDetailComponent implements OnInit, AfterViewInit {
  isLinear = true;

  private IPurchaseDetail: IPurchaseDetail = {
    uuid: '',
    item: 0,
    vendor_style: '',
    vendor_description: '',
    color: '',
    size: '',
    ordered: 0,
    recieved: 0,
    date: '',
  };

  private listPurchaseDetail: IPurchaseDetail[] = [];
  private PurchaseOrder: any;

  displayedColumns = ['Item', 'vendorstyle', 'vendordescription', 'color', 'size', 'ordered', 'recieved','pendingitems','date'];
  dataSource: any = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private artwork_status = [];

  constructor(private spinnerservice: Ng4LoadingSpinnerService, private _formBuilder: FormBuilder,
    private route: ActivatedRoute, private purchaseDetailService: PurchaseDetailService) { }

  ngOnInit() {
    this.spinnerservice.show();
    this.getQueryDetails();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getQueryDetails() {
    this.route.queryParams.subscribe(params => {
      const ReceiveID = params['ReceiveID'];
      console.log('uuid value are a------>', ReceiveID);
      this.getPurchaseOrder(ReceiveID);
    });
  }


  getPurchaseOrder(id) {
    this.purchaseDetailService.getPurchaseOrder(id)
      .subscribe(data => {
        this.PurchaseOrder = data;
        this.spinnerservice.hide();
        this.listPurchaseDetail = data.VendorReceiveDetails;
        this.dataSource = new MatTableDataSource(this.listPurchaseDetail);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'Item': return item.ReceiveItemID;
            case 'vendorstyle': return item.StyleNumber;
            case 'vendordescription': return item.Season;
            case 'color': return item.StyleColor;
            case 'size': return item.StyleOption;
            case 'ordered': return item.ordered;
            case 'recieved': return item.ItemQuantity;
            case 'date': return this.PurchaseOrder.SalesOrder.RequiredDate;
            default: return item[property];
          }
        };
      },
        error => {
          // console.log("error------->", error)
        });
  }
}
