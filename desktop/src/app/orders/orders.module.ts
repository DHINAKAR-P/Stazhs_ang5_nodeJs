import { NgModule,  NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatFormFieldModule, MatFormFieldControl, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrdersComponent } from './orders.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { SidenavModule } from '../sidenav/sidenav.module';
import {OrderService} from './orders.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {SuccessalertComponent} from '../successalert/successalert.component';
import {SuccessalertModule} from '../successalert/successalert.module';
import {FailurealertComponent} from '../failurealert/failurealert.component';
import {FailurealertModule} from '../failurealert/failurealert.module';
import { AuthGuard } from '../login/auth.guard';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'orders',
        component: OrdersComponent,
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
    MatCardModule,
    CommonModule,
    FormsModule,
    CommonModule,
    SidenavModule,
    SuccessalertModule,
    FailurealertModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  declarations: [
    OrdersComponent
  ],
  bootstrap: [OrdersComponent],
  providers: [OrderService],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class OrdersModule { }
