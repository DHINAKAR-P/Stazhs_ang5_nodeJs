import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavComponent } from './sidenav.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'ngx-avatar';
import { LoginService } from '../login/login.service';
import { ApiService } from '../config/api.service';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/Constant';
import { SharedService } from '../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

xdescribe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declarations: [ SidenavComponent ]
      imports: [
        CommonModule,
        AvatarModule,
        RouterModule.forRoot([]),
        HttpClientModule,
        BrowserModule
      ],
      declarations: [
        SidenavComponent
      ],
      providers: [
        LoginService,
        ApiService,
        ConfigService,
        SharedService,
        Constants,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
      // providers: [LoginService,
      //   { provide: APP_BASE_HREF, useValue: '/' }
      // ]
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
          'uuid': '', 'role': 'ROLE_DUMMY', 'allowedScreens': 'Dashboard,Orders,Purchase Orders,\
          Tickets, Invoices,Shipments, Inventory,Users,Organization'
        }],
        'organization': [{ 'uuid': '', 'organizationname': '' }], 'organizationUuid': ''
      }
    };
    sessionStorage.setItem('currentUser', JSON.stringify(userdata));
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    spyOn(component, 'ngOnInit');
    spyOn(component, 'getCurrentUserDetails');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
