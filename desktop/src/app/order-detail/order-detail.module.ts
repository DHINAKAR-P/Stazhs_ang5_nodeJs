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
import { OrderDetailComponent } from './order-detail.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { SidenavModule } from '../sidenav/sidenav.module';
import {MatStepperModule} from '@angular/material/stepper';
import {OrderDetailService} from './order-detail.service';
import {NotificationDetailsModule} from '../notification-details/notification-details.module';
import { AuthGuard } from '../login/auth.guard';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'order-detail',
        component: OrderDetailComponent,
        //canActivate: [AuthGuard]
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
    MatStepperModule,
    NotificationDetailsModule,
    Ng4LoadingSpinnerModule.forRoot()
    ],
  declarations: [
    OrderDetailComponent,

  ],
  providers: [OrderDetailService]
})
export class OrderDetailModule { }
