import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { SidenavModule } from '../sidenav/sidenav.module';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { DashboardService } from '../dashboard/dashboard.service';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ApiService } from '../config/api.service';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/Constant';
import { AuthGuard } from '../login/auth.guard';
import { SharedService } from '../shared/shared.service';


xdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([
          {
            path: 'dashboard',
            component: DashboardComponent,
            canActivate: [AuthGuard]
          }
        ]),
        HttpClientModule,
        CommonModule,
        SidenavModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        LoadingModule.forRoot({
          animationType: ANIMATION_TYPES.circleSwish,
          backdropBackgroundColour: '#ffffff',
          backdropBorderRadius: '100%',
          primaryColour: '#1e3d8c',
          secondaryColour: '#f7f986',
          tertiaryColour: '#ffffff'
        }),
        Ng2Bs3ModalModule,
        NgCircleProgressModule.forRoot({
          backgroundPadding: -28,
          radius: 33,
          space: -20,
          outerStrokeWidth: 22,
          outerStrokeColor: 'rgb(120, 192, 0)',
          innerStrokeColor: '#e7e8ea',
          innerStrokeWidth: 21,
          animateTitle: false,
          animationDuration: 400,
          showTitle: false,
          showUnits: false,
          showSubtitle: false,
          showBackground: false,
          outerStrokeLinecap: 'inherit'
        }),
        MatListModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
      ],
      declarations: [
        DashboardComponent,
      ],
      providers: [
        DashboardService,
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
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
