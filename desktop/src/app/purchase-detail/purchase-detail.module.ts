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
import { PurchaseDetailComponent } from './purchase-detail.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { SidenavModule } from '../sidenav/sidenav.module';
import { MatStepperModule } from '@angular/material/stepper';
import {PurchaseDetailService} from './purchase-detail.service';
import { AuthGuard } from '../login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'purchase-detail',
        component: PurchaseDetailComponent,
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
    MatStepperModule
  ],
  declarations: [
    PurchaseDetailComponent
  ],
  providers: [PurchaseDetailService]
})
export class PurchaseDetailModule { }
