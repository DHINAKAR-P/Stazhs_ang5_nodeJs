import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list.component';
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
import { MatPaginatorModule } from '@angular/material';
import { AvatarModule } from 'ngx-avatar';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AuthGuard } from '../../login/auth.guard';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: 'users',
        component: UsersListComponent,
        canActivate: [AuthGuard]
      }
    ]),
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
  declarations: [UsersListComponent]
})
export class UsersListModule { }
