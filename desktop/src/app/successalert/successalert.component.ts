import { Component, OnInit, Input } from '@angular/core';
import { OrdersComponent } from '../orders/orders.component';
import { TicketdetailsComponent } from '../ticket/ticketdetails/ticketdetails.component';
import { TicketComponent } from '../ticket/ticketsummary/ticket.component';

@Component({
  selector: 'app-successalert',
  templateUrl: './successalert.component.html',
  styleUrls: ['./successalert.component.css']
})
export class SuccessalertComponent implements OnInit {

  @Input() success: any;
  @Input() successmessage: any;
  constructor() { }

  ngOnInit() {
    setTimeout(function () {
      this.success = false;
    }.bind(this), 9000);
  }
  Onclick() {
    this.success = false;
  }
}
