import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {UserComponent} from '../user/user.component';
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



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
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
  providers: [
    UserService
  ]
})
export class UserModule { }
