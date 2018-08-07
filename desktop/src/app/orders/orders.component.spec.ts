import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatFormFieldModule, MatFormFieldControl, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrdersComponent } from './orders.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { SidenavModule } from '../sidenav/sidenav.module';
import {OrderService} from './orders.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {SuccessalertComponent} from '../successalert/successalert.component';
import {SuccessalertModule} from '../successalert/successalert.module';
import {FailurealertComponent} from '../failurealert/failurealert.component';
import {FailurealertModule} from '../failurealert/failurealert.module';
import { AuthGuard } from '../login/auth.guard';
import { ApiService } from '../config/api.service';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/Constant';
import { SharedService } from '../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';



xdescribe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([
          {
            path: 'orders',
            component: OrdersComponent,
            canActivate: [AuthGuard]
          }
        ]),
        HttpClientModule,
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
        CommonModule,
        SidenavModule,
        SuccessalertModule,
        FailurealertModule,
        MDBBootstrapModule.forRoot(),
        ReactiveFormsModule
      ],
      declarations: [
        OrdersComponent
      ],
      providers: [
        OrderService,
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
    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
