import { Component, OnInit, Input } from '@angular/core';
import { OrdersComponent } from '../orders/orders.component';
import { TicketdetailsComponent } from '../ticket/ticketdetails/ticketdetails.component';
import { TicketComponent } from '../ticket/ticketsummary/ticket.component';
@Component({
  selector: 'app-failurealert',
  templateUrl: './failurealert.component.html',
  styleUrls: ['./failurealert.component.css']
})
export class FailurealertComponent implements OnInit {

  @Input() failure: any;
  @Input() failuremessage: any;
  constructor() { }

  ngOnInit() {
    setTimeout(function () {
      this.failure = false;
    }.bind(this), 9000);

  }
  Onclick() {
    this.failure = false;
  }

}
