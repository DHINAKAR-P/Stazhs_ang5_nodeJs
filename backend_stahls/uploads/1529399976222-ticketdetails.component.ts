import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { TicketDetailService } from './ticketdetails.service';
import { Router } from '@angular/router';
import { IUser } from '../../user/user';
import { ITickets } from '../ticketInterface/Ticket';
// import { IChat } from './Chat';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Observable';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-ticketdetails',
  templateUrl: './ticketdetails.component.html',
  styleUrls: ['./ticketdetails.component.scss']
})

export class TicketdetailsComponent implements OnInit {

  private uuid: string;
  private listOfSelectedUser: IUser[] = [];
  private hideCloseButton: boolean;
  private hideReopenButton: boolean;
  private hideEscalate: boolean;
  private currentUser;
  private ListofChats = [];
  public ticket: ITickets = {
    uuid: '',
    time: new Date,
    priority: '',
    severity: '',
    status: '',
    description: '',
    subject: '',
    escalate: '',
    UserUuid: '',
    ownerfk: 0,
    changetime: new Date,
    assignTo: 0,
    assigntofk: 0,
  };
  // public chat: IChat = {
  //   uuid: null,
  //   request: null,
  //   TicketUuid: null,
  //   UserUuid: null,
  //   status: null,
  //   escalate: null,
  //   assignTo: null
  // };

  @ViewChild('closeticket')
  modal_closeticket: ModalComponent;

  @ViewChild('reopenticket')
  modal_reopenticket: ModalComponent;

  @ViewChild('escalate')
  modal_escalate: ModalComponent;

  @ViewChild('reassignedticket')
  modal_reassignedticket: ModalComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public toastr: ToastsManager,
    private ticketservice: TicketDetailService,
    private vRef: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.uuid = params['uuid'];
    });

    this.hideCloseButton = false;
    this.hideEscalate = false;
    this.hideReopenButton = false;
    this.getTicketByUUID(this.uuid);
    this.getUserByRoleTM();
    // Observable.interval(5000).subscribe(x => {
    //   console.log("5mins------------------------>",x)
    //   this.getChatByTicketId(this.uuid);

    // });
    this.getChatByTicketId(this.uuid);
  }

  getTicketByUUID(id) {
    this.ticketservice.getTicketByUUID(id).subscribe(
      data => {
        this.ticket = data;
        if (this.ticket.status === 'ReOpened') {
          this.hideReopenButton = true;
        } else if (this.ticket.status === 'Closed') {
          this.hideCloseButton = true;
        }
        if (this.ticket.escalate === 'yes') {
          this.hideEscalate = true;
        }
      },
      error => {
        this.toastr.error(
          'Error!'
        );
      }
    );
  }

  getChatByTicketId(TicketId) {
    this.ticketservice.getChatByTicketId(TicketId).subscribe(
      data => {
        console.log('get all data of chat values are --------- ', data);
        this.ListofChats = data;
        for (let i = 0; i < this.ListofChats.length; i++) {
          if (this.ListofChats[i].Ticket) {
            if (this.ListofChats[i].Ticket.UserUuid === this.currentUser.uuid) {
              this.ListofChats[i].currentuser = true;
            }
          }

        }
        console.log('get all data of chat values are ----22222----- ', this.ListofChats);
      }
    );
  }

  getUserByRoleTM() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (this.currentUser.user.Authorities[0].role === 'ROLE_TL') {
      this.ticketservice.getUserByRoleTM(this.currentUser.user.Authorities[0].uuid).subscribe(
        data => {
          this.listOfSelectedUser = data;
        },
        error => {
          this.toastr.error(
            'Error!'
          );
        }
      );
    } else {
    }
  }

  modalCT() {
    this.modal_closeticket.open();
  }

  modalRO() {
    this.modal_reopenticket.open();
  }
  modalEscalate() {
    this.modal_escalate.open();
  }

  modalReassigned() {
    this.modal_reassignedticket.open();
  }

  closeTicket() {
    this.ticket.status = 'Closed';
    this.ticketservice.updateTicket(this.ticket).subscribe(
      data => {
        this.router.navigate(['tickets']);
        this.saveChat(this.ticket.status, null, null);
      },
      error => {
        this.toastr.error(
          'Error!'
        );
      }
    );
  }

  ReOpenTickets() {
    this.ticket.status = 'ReOpened';
    this.ticketservice.updateTicket(this.ticket).subscribe(
      data => {
        this.router.navigate(['/tickets']);
        this.saveChat(this.ticket.status, null, null);
      },
      error => {
        this.toastr.error(
          'Error!'
        );
      });
  }

  escalateTicket() {
    this.ticket.escalate = 'yes';
    this.ticketservice.updateTicket(this.ticket).subscribe(
      data => {
        this.router.navigate(['tickets']);
        this.saveChat(null, this.ticket.escalate, null);
      },
      error => {
        this.toastr.error(
          'Error!'
        );
      });
  }

  reassignedTicket(selecteduser) {
    this.ticket.assignTo = selecteduser.uuid;
    this.ticketservice.updateTicket(this.ticket).subscribe(
      data => {
        this.router.navigate(['tickets']);
        this.saveChat(null, null, this.ticket.assignTo);
      },
      error => {
        this.toastr.error(
          'Error!'
        );
      });
  }
  cancelTicket() {
    this.router.navigate(['/tickets']);
  }

  saveChat(ticketStatus, ticketEscalate, ticketAssign) {
    // const chat = {
    //   uuid: uuid(),
    //   request: null,
    //   TicketUuid: this.ticket.uuid,
    //   UserUuid: this.currentUser.user.uuid,
    //   status: ticketStatus,
    //   escalate: ticketEscalate,
    //   assignTo: ticketAssign
    // };
    this.chat.uuid = uuid();
    this.chat.request = null;
    this.chat.TicketUuid = this.ticket.uuid;
    this.chat.UserUuid = this.currentUser.user.uuid;
    this.chat.status = ticketStatus;
    this.chat.escalate = ticketEscalate;
    this.chat.assignTo = ticketAssign;
    this.ticketservice.saveChat(this.chat).subscribe(
      data => {
        console.log(' suceses data ', data);
        this.getChatByTicketId(this.ticket.uuid);
      }
    );
  }
  saveChatData(chatValues) {
    // const chatData = {
    //   uuid: uuid(),
    //   request: chat,
    //   TicketUuid: this.ticket.uuid,
    //   UserUuid: this.currentUser.user.uuid
    // };
    this.chat.uuid = uuid();
    this.chat.request = chatValues;
    this.chat.TicketUuid = this.ticket.uuid;
    this.chat.UserUuid = this.currentUser.user.uuid;

    this.ticketservice.saveChat(this.chat).subscribe(
      data => {
        console.log(' suceses data ', data);
        this.getChatByTicketId(this.ticket.uuid);
      }
    );
  }
}
