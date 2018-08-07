import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { SidenavModule } from '../sidenav/sidenav.module';

import { MatButtonModule } from '@angular/material';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { AuthGuard } from '../login/auth.guard';
import {DashboardService} from '../dashboard/dashboard.service';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      }
    ]),
    CommonModule,
    SidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
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
      showUnits: true,
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
  providers: [DashboardService],
  exports: [DashboardComponent]
})
export class DashboardModule { }
