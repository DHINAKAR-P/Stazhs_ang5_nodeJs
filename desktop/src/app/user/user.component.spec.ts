import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {SidenavModule} from '../sidenav/sidenav.module';
import { MatCardModule } from '@angular/material/card';
import { NewRoleComponent } from './new-role/new-role.component';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from './user.service';
import { NewUserComponent } from './new-user/new-user.component';
import { MatSelectModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AuthGuard } from '../login/auth.guard';
import { ApiService } from '../config/api.service';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/Constant';
import { SharedService } from '../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';



xdescribe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declarations: [ UserComponent ]
      imports: [
        CommonModule,
        RouterModule.forRoot([
          {
            path: 'user',
            component: UserComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'new-role',
            component: NewRoleComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'new-user',
            component: NewUserComponent,
            canActivate: [AuthGuard]
          }
        ]),
        HttpClientModule,
        Ng2Bs3ModalModule,
        MatDialogModule,
        SidenavModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatListModule,
        MatButtonModule
      ],
      declarations: [UserComponent, NewRoleComponent, NewUserComponent],
      // providers: [
      //   UserService
      // ]
      providers: [
        UserService,
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
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
