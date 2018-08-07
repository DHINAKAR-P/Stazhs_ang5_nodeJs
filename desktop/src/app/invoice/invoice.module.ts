import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice.component';
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
import {InvoiceService} from './invoice.service';

import { SidenavModule } from '../sidenav/sidenav.module';
import { AuthGuard } from '../login/auth.guard';
@NgModule({
  imports: [
    CommonModule,
    SidenavModule,
    RouterModule.forChild([
      {
        path: 'invoices',
        component: InvoiceComponent,
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
    ReactiveFormsModule

  ],
  declarations: [InvoiceComponent],
  providers: [InvoiceService]
})
export class InvoiceModule { }
