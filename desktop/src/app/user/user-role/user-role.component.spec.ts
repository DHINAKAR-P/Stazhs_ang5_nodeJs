import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleComponent } from './user-role.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidenavModule } from '../../sidenav/sidenav.module';
import { MatDialogModule } from '@angular/material';
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
import { MatPaginatorModule } from '@angular/material';
import { AvatarModule } from 'ngx-avatar';
import { BrowserModule } from '@angular/platform-browser';
import { AuthGuard } from '../../login/auth.guard';
import { UserService } from '../user.service';
import { ApiService } from '../../config/api.service';
import { ConfigService } from '../../config/config.service';
import { Constants } from '../../config/Constant';
import { SharedService } from '../../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';



xdescribe('UserRoleComponent', () => {
  let component: UserRoleComponent;
  let fixture: ComponentFixture<UserRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declarations: [ UserRoleComponent ]
      imports: [
        BrowserModule,
        CommonModule,
        RouterModule.forRoot([
          {
            path: 'user-roles',
            component: UserRoleComponent,
            canActivate: [AuthGuard]
          }
        ]),
        HttpClientModule,
        MatDialogModule,
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
      declarations: [UserRoleComponent],
      providers: [
        UserService,
        ApiService,
        ConfigService,
        SharedService,
        Constants,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
      // providers: [
      //   UserService,
      //   { provide: APP_BASE_HREF, useValue: '/' }
      // ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
