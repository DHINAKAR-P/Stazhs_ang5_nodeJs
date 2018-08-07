import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketcreationComponent } from './ticketcreation.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FileSelectDirective } from 'ng2-file-upload';
import { SidenavModule } from '../../sidenav/sidenav.module';
import { MatPaginatorModule } from '@angular/material';
import { TicketCreationService } from './ticketcreation.service';
import { SuccessalertModule } from '../../successalert/successalert.module';
import { FailurealertModule } from '../../failurealert/failurealert.module';
import { AuthGuard } from '../../login/auth.guard';
import { ApiService } from '../../config/api.service';
import { ConfigService } from '../../config/config.service';
import { Constants } from '../../config/Constant';
import { SharedService } from '../../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OrderService } from '../../orders/orders.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



describe('TicketcreationComponent', () => {
  let component: TicketcreationComponent;
  let fixture: ComponentFixture<TicketcreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declarations: [ TicketcreationComponent ]
      imports: [
        RouterModule.forRoot([
            {
                path: 'ticketcreation',
                component: TicketcreationComponent,
                canActivate: [AuthGuard]
            }
        ]),
        HttpClientModule,
        CommonModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSortModule,
        FormsModule,
        // MatCardModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        SidenavModule,
        MatPaginatorModule,
        SuccessalertModule,
        FailurealertModule,
        Ng4LoadingSpinnerModule.forRoot()
    ],
    declarations: [
        TicketcreationComponent,
        FileSelectDirective
    ],
    // providers: [TicketCreationService]
    providers: [
      OrderService,
      TicketCreationService,
      ApiService,
      ConfigService,
      SharedService,
      Constants,
      { provide: APP_BASE_HREF, useValue: '/' }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const userdata = {
      'token': '12345',
      'user': {
        'uuid': '',
        'username': 'xxxx', 'password': 'xxxx', 'firstname': 'xxxx',
        'lastname': 'xxxx', 'email': 'xxxx@gmail.com', 'isDisabled': false,
        'Authorities': [{
          'uuid': '', 'role': 'ROLE_DUMMY', 'allowedScreens': 'Dashboard,Orders,\
        Purchase Orders,Tickets, Invoices,Shipments, Inventory,Users,Organization' }],
        'organization': [{ 'uuid': '', 'organizationname': '' }], 'organizationUuid': ''
      }
    };
    // const organizationname: String = userdata.user.organization[0].organizationname;
    sessionStorage.setItem('currentUser', JSON.stringify(userdata));
    fixture = TestBed.createComponent(TicketcreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call ngOnInit', () => {
    component.ngOnInit();
// tslint:disable-next-line:no-unused-expression
expect(component.getAllOrders).toHaveBeenCalled;
// tslint:disable-next-line:no-unused-expression
expect(component.getquerydetails).toHaveBeenCalled;
// tslint:disable-next-line:no-unused-expression
expect(component.getAllOrg).toHaveBeenCalled;
// tslint:disable-next-line:no-unused-expression
expect(component.currentUserDetails).toHaveBeenCalled;
  });

  it('should have been called', () => {
// tslint:disable-next-line:no-unused-expression
expect(component.addItems).toHaveBeenCalled;
// tslint:disable-next-line:no-unused-expression
expect(component.applyFilter).toHaveBeenCalled;
// tslint:disable-next-line:no-unused-expression
expect(component.initializeVariable).toHaveBeenCalled;
// tslint:disable-next-line:no-unused-expression
expect(component.saveTicket).toHaveBeenCalled;
// tslint:disable-next-line:no-unused-expression
expect(component.toggle).toHaveBeenCalled;
});

});
