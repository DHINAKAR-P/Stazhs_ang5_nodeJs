import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { InventoryComponent } from './inventory.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { SidenavModule } from '../sidenav/sidenav.module';
import { InventoryService } from './inventory.service';
import { ApiService } from '../config/api.service';
import { InventoryitemsComponent } from './inventoryitems/inventoryitems.component';
import { AuthGuard } from '../login/auth.guard';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'inventory',
        component: InventoryComponent,
        canActivate: [AuthGuard]
      }, {
        path: 'inventoryitem',
        component: InventoryitemsComponent,
        canActivate: [AuthGuard]
      }
    ]),
    MatChipsModule,
    MatSelectModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    SidenavModule
  ],
  declarations: [
    InventoryComponent,
    InventoryitemsComponent
  ],
  providers: [
    InventoryService, ApiService
  ],
})
export class InventoryModule { }
