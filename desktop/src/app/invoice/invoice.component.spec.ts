import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
import { InvoiceService } from './invoice.service';

import { SidenavModule } from '../sidenav/sidenav.module';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ApiService } from '../config/api.service';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/Constant';
import { AuthGuard } from '../login/auth.guard';
import { SharedService } from '../shared/shared.service';

xdescribe('InvoiceComponent', () => {
  let component: InvoiceComponent;
  let fixture: ComponentFixture<InvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SidenavModule,
        RouterModule.forRoot([
          {
            path: 'invoices',
            component: InvoiceComponent,
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
        ReactiveFormsModule
      ],
      declarations: [InvoiceComponent],
      providers: [
        InvoiceService,
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
        'Authorities': [{ 'uuid': '', 'role': 'ROLE_DUMMY' }],
        'organization': [{ 'uuid': '', 'organizationname': '' }], 'organizationUuid': ''
      }
    };
    sessionStorage.setItem('currentUser', JSON.stringify(userdata));
    fixture = TestBed.createComponent(InvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
