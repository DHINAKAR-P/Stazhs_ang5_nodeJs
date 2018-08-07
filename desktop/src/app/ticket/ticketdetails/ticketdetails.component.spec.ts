import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketdetailsComponent } from './ticketdetails.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavModule } from '../../sidenav/sidenav.module';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TicketDetailService } from './ticketdetails.service';
import { SuccessalertComponent } from '../../successalert/successalert.component';
import { SuccessalertModule } from '../../successalert/successalert.module';
import { FailurealertComponent } from '../../failurealert/failurealert.component';
import { FailurealertModule } from '../../failurealert/failurealert.module';
import { AuthGuard } from '../../login/auth.guard';
import { ApiService } from '../../config/api.service';
import { ConfigService } from '../../config/config.service';
import { Constants } from '../../config/Constant';
import { SharedService } from '../../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OrderService } from '../../orders/orders.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




describe('TicketdetailsComponent', () => {
  let component: TicketdetailsComponent;
  let fixture: ComponentFixture<TicketdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declarations: [ TicketdetailsComponent ]
      imports: [
        RouterModule.forRoot([{
          path: 'ticketdetails',
          component: TicketdetailsComponent,
          canActivate: [AuthGuard]
        }]),
        HttpClientModule,
        BrowserAnimationsModule,
        CommonModule,
        BrowserModule,
        MatButtonModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        SidenavModule,
        Ng2Bs3ModalModule,
        MatInputModule,
        MatRadioModule,
        MatFormFieldModule,
        MatTableModule,
        MatSortModule,
        SuccessalertModule,
        FailurealertModule,
        MatSelectModule
      ],
      declarations: [
        TicketdetailsComponent
      ],
      // providers: [TicketDetailService]
      providers: [
        OrderService,
        TicketDetailService,
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
          'uuid': '', 'role': 'ROLE_DUMMY', 'allowedScreens': 'Dashboard,Orders, \
        Purchase Orders,Tickets, Invoices,Shipments, Inventory,Users,Organization' }],
        'organization': [{ 'uuid': '', 'organizationname': '' }], 'organizationUuid': ''
      }
    };
    // const organizationname: String = userdata.user.organization[0].organizationname;
    sessionStorage.setItem('currentUser', JSON.stringify(userdata));
    fixture = TestBed.createComponent(TicketdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call ngOnInit', () => {
    expect(this.showDetails).toBeFalsy();
    // tslint:disable-next-line:no-unused-expression
    expect(component.getQueryDetails).toHaveBeenCalled;
    // tslint:disable-next-line:no-unused-expression
    expect(component.getAllOrganization).toHaveBeenCalled;
    // tslint:disable-next-line:no-unused-expression
    expect(component.getAllOrganizationUser).toHaveBeenCalled;
    // tslint:disable-next-line:no-unused-expression
    expect(component.getclosereason).toHaveBeenCalled;
  });
  it('should be called', () => {
    // tslint:disable-next-line:no-unused-expression
    expect(component.closeTicketOption).toHaveBeenCalled;
    // tslint:disable-next-line:no-unused-expression
    expect(component.download).toHaveBeenCalled;
    // tslint:disable-next-line:no-unused-expression
    expect(component.filterOrg).toHaveBeenCalled;
    // tslint:disable-next-line:no-unused-expression
    expect(component.getTicketByUuid).toHaveBeenCalled;
  });
});
