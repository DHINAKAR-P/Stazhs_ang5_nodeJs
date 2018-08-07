import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponent } from './create.component';
import { RouterModule } from '@angular/router';
import { SidenavModule } from '../../sidenav/sidenav.module';
import { ApiService } from '../../config/api.service';
import { ConfigService } from '../../config/config.service';
import { Constants } from '../../config/Constant';
import { OrganizationService } from '../organization.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material';
import {  MatSortModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { AuthGuard } from '../../login/auth.guard';
import { AvatarModule } from 'ngx-avatar';
import {TicketCreationModule} from '../../ticket/ticketcreation/ticketcreation.module';
import { SharedService } from '../../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


xdescribe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([ {
            path: 'create-org',
            component: CreateComponent,
            canActivate: [AuthGuard]
        }]),
        HttpClientModule,
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
    declarations: [CreateComponent],
    providers: [
      OrganizationService,
      ApiService,
      ConfigService,
      Constants,
      SharedService,
      { provide: APP_BASE_HREF, useValue: '/' }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
