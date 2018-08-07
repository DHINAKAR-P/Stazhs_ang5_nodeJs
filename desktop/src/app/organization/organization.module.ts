import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidenavModule } from '../sidenav/sidenav.module';
import { OrganizationComponent } from './organization.component';
import { ApiService } from '../config/api.service';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/Constant';
import { OrganizationService } from './organization.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material';
import {  MatSortModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { CreateComponent } from './create/create.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { AuthGuard } from '../login/auth.guard';
import { AvatarModule } from 'ngx-avatar';

import {TicketCreationModule} from '../ticket/ticketcreation/ticketcreation.module';


@NgModule({
    imports: [
        RouterModule.forChild([{
            path: 'organization',
            component: OrganizationComponent,
            canActivate: [AuthGuard]
        }, {
            path: 'create-org',
            component: CreateComponent,
            canActivate: [AuthGuard]
        }]),
        MatFormFieldModule,
        MatInputModule,
        CommonModule,
        BrowserModule,
        MatButtonModule,
        SidenavModule,
        ReactiveFormsModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        TicketCreationModule,
        AvatarModule
    ],
    declarations: [OrganizationComponent, CreateComponent],
    providers: [OrganizationService, ApiService, ConfigService, Constants]
})
export class OrganizationModule { }
