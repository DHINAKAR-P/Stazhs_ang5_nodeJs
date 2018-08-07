import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TicketdetailsComponent } from './ticketdetails.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavModule } from '../../sidenav/sidenav.module';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TicketDetailService } from './ticketdetails.service';
import {SuccessalertComponent} from '../../successalert/successalert.component';
import {SuccessalertModule} from '../../successalert/successalert.module';
import {FailurealertComponent} from '../../failurealert/failurealert.component';
import {FailurealertModule} from '../../failurealert/failurealert.module';
import { AuthGuard } from '../../login/auth.guard';


@NgModule({
    imports: [
        RouterModule.forChild([{
            path: 'ticketdetails',
            component: TicketdetailsComponent,
            //canActivate: [AuthGuard]
        }]),
        CommonModule,
        BrowserModule,
        MatButtonModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        SidenavModule,
        Ng2Bs3ModalModule,
        MatInputModule,
        MatRadioModule,
        MatFormFieldModule,
        MatTableModule,
        MatSortModule,
        SuccessalertModule,
        FailurealertModule,
        MatSelectModule
    ],
    declarations: [
        TicketdetailsComponent
    ],
    providers: [TicketDetailService]
})
export class TicketDetailsModule {

}
