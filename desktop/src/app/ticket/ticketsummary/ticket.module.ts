import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TicketComponent } from './ticket.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { SidenavModule } from '../../sidenav/sidenav.module';
import { MatPaginatorModule } from '@angular/material';
import { TicketService } from './ticket.service';
import { SuccessalertModule } from '../../successalert/successalert.module';
import { FailurealertModule } from '../../failurealert/failurealert.module';
import { AuthGuard } from '../../login/auth.guard';




@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'ticket',
        component: TicketComponent,
        canActivate: [AuthGuard]
      }
    ]),
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    SidenavModule,
    SuccessalertModule,
    FailurealertModule,
    MatPaginatorModule
  ],
  declarations: [
    TicketComponent
  ],
  providers: [TicketService]
})
export class TicketModule { }
