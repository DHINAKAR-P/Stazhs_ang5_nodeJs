import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../inventory.service';
import { ApiService } from '../../config/api.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-inventoryitems',
  templateUrl: './inventoryitems.component.html',
  styleUrls: ['./inventoryitems.component.css']
})
export class InventoryitemsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['Transaction ID', 'Style Number', 'Color', 'Size', 'Adjustment Reason', 'Adjustment Reason2', 'Date', 'Quantity'];
  dataSource: any;
  private inventoryitems: any[] = [];
  private filterArr: any[];
  private itemsid: any[] = [];
  private filter_listOfInventoryitemquantity: any = [];
  private filter_listOfInventoryitemsize: any = [];
  private selectedLocation: any;
  constructor(private inventoryService: InventoryService, private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getquerydetails();

  }
  getquerydetails() {
    this.route.queryParams.subscribe(params => {
      const uuid = params['uuid'];
      this.itemsid = params['uuid'];
      this.getallInventoryitems(uuid);
    });
  }
  getallInventoryitems(id) {
    this.inventoryService.getInventorybyId(id).subscribe(
      data => {
        this.inventoryitems = data.FinishedGoodsAdjustments;
        this.filter_listOfInventoryitemquantity = Array.from(new Set(this.inventoryitems.map((itemInArray) => itemInArray.quantity)));
        this.filter_listOfInventoryitemsize = Array.from(new Set(this.inventoryitems.map((itemInArray) => itemInArray.size)));
        console.log('-------items------------', data.FinishedGoodsAdjustments);
        this.dataSource = new MatTableDataSource(this.inventoryitems);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'Transaction ID': return item.TransactionID;
            case 'Style Number': return item.Stylenumber;
            case 'Color': return item.color;
            case 'Size': return item.size;
            case 'Adjustment Reason': return item.Adjustementreason;
            case 'Adjustment Reason2': return item.Adjustementreason2;
            case 'Date': return item.date;
            case 'Quantity': return item.quantity;
            default: return item[property];
          }
        };
      }, error => {
        console.log('error');
      }
    );
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  filter() {
    this.filterArr = [];
    if (this.selectedLocation !== undefined) {
      if (this.selectedLocation.length === 0) {
        this.dataSource = new MatTableDataSource(this.inventoryitems);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      } else {
        this.selectedLocation.forEach(element => {
          this.inventoryitems.forEach(one => {
            if (one.size === element) {
              this.filterArr.push(one);
              console.log('---------abcd-------------', one.size);
            }
            if (one.quantity === element) {
              this.filterArr.push(one);
              console.log('---------abcd-------------', one.quantity);
            }
            const filterdata = Array.from(new Set(this.filterArr.map((itemInArray) => itemInArray)));
            this.dataSource = new MatTableDataSource(filterdata);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
          // console.log('--------filter----------', element);
          // this.dataSource.filter = element;
        });
      }
    }
  }
}
