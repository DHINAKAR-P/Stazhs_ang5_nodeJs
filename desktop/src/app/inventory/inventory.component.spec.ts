import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryComponent } from './inventory.component';
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
import { SidenavComponent } from '../sidenav/sidenav.component';
import { SidenavModule } from '../sidenav/sidenav.module';
import { InventoryService } from './inventory.service';
import { InventoryitemsComponent } from './inventoryitems/inventoryitems.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../config/api.service';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/Constant';
import { AuthGuard } from '../login/auth.guard';
import { SharedService } from '../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';



xdescribe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([
          {
            path: 'inventory',
            component: InventoryComponent,
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
        SidenavModule
      ],
      declarations: [
        InventoryComponent,
        InventoryitemsComponent
      ],
      providers: [
        InventoryService,
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
    const userdata = {
      'token': '12345',
      'user': {
        'uuid': '',
        'username': 'xxxx', 'password': 'xxxx', 'firstname': 'xxxx',
        'lastname': 'xxxx', 'email': 'xxxx@gmail.com', 'isDisabled': false,
        'Authorities': [{ 'uuid': '', 'role': 'ROLE_DUMMY' }],
        'organization': [{ 'uuid': '', 'organizationname': '' }], 'organizationUuid': ''
      }
    };
    sessionStorage.setItem('currentUser', JSON.stringify(userdata));
    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
