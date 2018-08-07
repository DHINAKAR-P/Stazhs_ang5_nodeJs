import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketComponent } from './ticket.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
import { ApiService } from '../../config/api.service';
import { ConfigService } from '../../config/config.service';
import { Constants } from '../../config/Constant';
import { AuthGuard } from '../../login/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';
import { SharedService } from '../../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { By } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrganizationComponent } from '../../organization/organization.component';


describe('TicketComponent', () => {
  let component: TicketComponent;
  let fixture: ComponentFixture<TicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([
          {
            path: 'ticket',
            component: TicketComponent,
            canActivate: [AuthGuard]
          }
        ]),
        RouterModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpModule,
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
      providers: [
        TicketService,
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
    const organizationname: String = userdata.user.organization[0].organizationname;
    sessionStorage.setItem('currentUser', JSON.stringify(userdata));
    fixture = TestBed.createComponent(TicketComponent);
    component = fixture.componentInstance;
    spyOn(component, 'ngOnInit');
    spyOn(component, 'ngAfterViewInit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //   it('should have first name ', () => {
  // const first = fixture.debugElement.query(By.css('p.title.b'));
  //   });
  it('should call nginit', () => {
    component.ngOnInit();
    // tslint:disable-next-line:no-unused-expression
    expect(this.organizationname).toBeUndefined;
    expect(component.getAllAdminTicket).toBeTruthy();
    // tslint:disable-next-line:no-unused-expression
    expect(this.organizationname).not.toBeUndefined;
    expect(component.getAllTicket).toBeTruthy();
  });
  it('should be called ', () => {
    // expect(component.getAllTicket).toHaveBeenCalled();
    const spy = spyOn(component, 'getAllTicket').and.callThrough();
    expect(OrganizationComponent).not.toContain('Stahls');
    // tslint:disable-next-line:no-unused-expression
    expect(component.applyFilter).toHaveBeenCalled;
    // tslint:disable-next-line:no-unused-expression
    expect(component.assignedToFilter).toHaveBeenCalled;
    // tslint:disable-next-line:no-unused-expression
    expect(component.createByFilter).toHaveBeenCalled;
    // tslint:disable-next-line:no-unused-expression
    expect(component.initializeValue).toHaveBeenCalled;
    // tslint:disable-next-line:no-unused-expression
    expect(component.onRowSelected).toHaveBeenCalled;
    // tslint:disable-next-line:no-unused-expression
    expect(component.organizationFilter).toHaveBeenCalled;
    // tslint:disable-next-line:no-unused-expression
    expect(component.showTableData).toHaveBeenCalled;
    // tslint:disable-next-line:no-unused-expression
    expect(component.statusFilter).toHaveBeenCalled;
    // tslint:disable-next-line:no-unused-expression
  });
});
