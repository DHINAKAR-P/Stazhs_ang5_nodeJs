import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListComponent } from './users-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidenavModule } from '../../sidenav/sidenav.module';
import { MatCardModule } from '@angular/material/card';
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
import { MatPaginatorModule, MatDialogModule } from '@angular/material';
import { AvatarModule } from 'ngx-avatar';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AuthGuard } from '../../login/auth.guard';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../user.service';
import { ApiService } from '../../config/api.service';
import { ConfigService } from '../../config/config.service';
import { SharedService } from '../../shared/shared.service';
import { Constants } from '../../config/Constant';


xdescribe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declarations: [ UsersListComponent ]
      imports: [
        BrowserModule,
        CommonModule,
        RouterModule.forRoot([
          {
            path: 'users',
            component: UsersListComponent,
            canActivate: [AuthGuard]
          }
        ]),
        HttpClientModule,
        MatDialogModule,
        Ng2Bs3ModalModule,
        MatButtonModule,
        SidenavModule,
        MatSortModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MatCardModule,
        ReactiveFormsModule,
        SidenavModule,
        MatPaginatorModule,
        AvatarModule
      ],
      declarations: [UsersListComponent],
      // providers: [
      //   UserService,
      //   { provide: APP_BASE_HREF, useValue: '/' }
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
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
