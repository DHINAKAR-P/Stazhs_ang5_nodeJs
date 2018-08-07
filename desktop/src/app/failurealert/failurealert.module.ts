import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FailurealertComponent} from './failurealert.component';
import {OrdersModule} from '../orders/orders.module';
import {TicketDetailsModule} from '../ticket/ticketdetails/ticketdetails.module';
import {TicketModule} from '../ticket/ticketsummary/ticket.module';

@NgModule({
    imports: [
      CommonModule,
      RouterModule
    ],
    declarations: [FailurealertComponent],
    providers: [],
    exports: [ FailurealertComponent ]
  })
  export class FailurealertModule { }

