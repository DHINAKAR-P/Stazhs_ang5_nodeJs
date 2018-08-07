import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatCardModule } from '@angular/material/card';
import { TicketcreationComponent } from './ticketcreation.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FileSelectDirective } from 'ng2-file-upload';
import { SidenavModule } from '../../sidenav/sidenav.module';
import { MatPaginatorModule } from '@angular/material';
import { TicketCreationService } from './ticketcreation.service';
import { SuccessalertModule } from '../../successalert/successalert.module';
import { FailurealertModule } from '../../failurealert/failurealert.module';
import { AuthGuard } from '../../login/auth.guard';
// import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'ticketcreation',
                component: TicketcreationComponent,
                canActivate: [AuthGuard]
            }
        ]),
        CommonModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSortModule,
        FormsModule,
        // MatCardModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        SidenavModule,
        MatPaginatorModule,
        SuccessalertModule,
        FailurealertModule,
        // Ng4LoadingSpinnerModule.forRoot()
    ],
    declarations: [
        TicketcreationComponent,
        FileSelectDirective
    ],
    providers: [TicketCreationService],
    exports: [FileSelectDirective]
})
export class TicketCreationModule { }
