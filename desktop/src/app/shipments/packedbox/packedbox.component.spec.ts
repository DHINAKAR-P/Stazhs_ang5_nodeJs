import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackedboxComponent } from './packedbox.component';
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


xdescribe('PackedboxComponent', () => {
  let component: PackedboxComponent;
  let fixture: ComponentFixture<PackedboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declarations: [ PackedboxComponent ]
      imports: [
        RouterModule.forRoot([
           {
            path: 'packedboxes',
            component: PackedboxComponent,
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
        PackedboxComponent,
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
    fixture = TestBed.createComponent(PackedboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
