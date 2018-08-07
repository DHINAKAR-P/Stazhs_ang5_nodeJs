import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseComponent } from './purchase.component';
import { PurchaseOrderService } from './purchaseorder.service';
import { RouterModule } from '@angular/router';
import { SidenavModule } from '../sidenav/sidenav.module';
import {
  MatFormFieldModule, MatInputModule, MatSelectModule,
  MatTableModule, MatPaginatorModule, MatSortModule, MatCardModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../login/auth.guard';


@NgModule({
  imports: [
    RouterModule.forChild([{
      path: 'purchase',
      component: PurchaseComponent,
      canActivate: [AuthGuard]
    }]),
    CommonModule,
    MatPaginatorModule,
    SidenavModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatCardModule

  ],
  declarations: [
    PurchaseComponent
  ],
  providers: [PurchaseOrderService]
})
export class PurchaseModule { }
