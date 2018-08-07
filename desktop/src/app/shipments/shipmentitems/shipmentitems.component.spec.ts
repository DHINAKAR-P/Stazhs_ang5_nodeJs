import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentitemsComponent } from './shipmentitems.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { ShipmentsComponent } from '../shipments.component';
import { SidenavComponent } from '../../sidenav/sidenav.component';
import { SidenavModule } from '../../sidenav/sidenav.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ShipmentsService } from '../shipments.service';
import { AuthGuard } from '../../login/auth.guard';
import { ApiService } from '../../config/api.service';
import { ConfigService } from '../../config/config.service';
import { Constants } from '../../config/Constant';
import { SharedService } from '../../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


xdescribe('ShipmentitemsComponent', () => {
  let component: ShipmentitemsComponent;
  let fixture: ComponentFixture<ShipmentitemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declarations: [ ShipmentitemsComponent ]
      imports: [
        RouterModule.forRoot([
          {
            path: 'shipments',
            component: ShipmentsComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'shipments-tems',
            component: ShipmentitemsComponent,
            canActivate: [AuthGuard]
          }
        ]),
        HttpClientModule,
        MatChipsModule,
        MatSelectModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
        CommonModule,
        FormsModule,
        CommonModule,
        SidenavModule,
        MatTooltipModule,
        ReactiveFormsModule
      ],
      declarations: [
        ShipmentsComponent,
        ShipmentitemsComponent,
      ],
      // providers: [ShipmentsService]
      providers: [
        ShipmentsService,
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
    fixture = TestBed.createComponent(ShipmentitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
