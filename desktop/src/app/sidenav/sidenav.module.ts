import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav.component';
import { AvatarModule } from 'ngx-avatar';
import { LoginService } from '../login/login.service';


@NgModule({
  imports: [
    CommonModule,
    AvatarModule,
    RouterModule
  ],
  declarations: [
    SidenavComponent
  ],
  providers: [LoginService],
  exports: [SidenavComponent]
})
export class SidenavModule { }
