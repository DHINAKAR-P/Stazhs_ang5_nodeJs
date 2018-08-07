import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';

import { ShipmentsComponent } from './shipments.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { SidenavModule } from '../sidenav/sidenav.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ShipmentsService } from './shipments.service';
import { PackedboxComponent } from './packedbox/packedbox.component';
import { ShipmentitemsComponent } from './shipmentitems/shipmentitems.component';
import { PackeditemsComponent } from './packeditems/packeditems.component';
import { AuthGuard } from '../login/auth.guard';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'shipments',
        component: ShipmentsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'shipments-tems',
        component: ShipmentitemsComponent,
        canActivate: [AuthGuard]
      }, {
        path: 'packedboxes',
        component: PackedboxComponent,
        canActivate: [AuthGuard]
      }, {
        path: 'packed-items',
        component: PackeditemsComponent,
        canActivate: [AuthGuard]
      }
    ]),
    MatChipsModule,
    MatSelectModule,
    MatSortModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    CommonModule,
    SidenavModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatDatepickerModule
  ],
  declarations: [
    ShipmentsComponent,
    PackedboxComponent,
    ShipmentitemsComponent,
    PackeditemsComponent
  ],
  providers: [ShipmentsService,
    DatePipe]
})
export class ShipmentsModule { }
