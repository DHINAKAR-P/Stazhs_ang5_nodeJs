import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { PurchaseComponent } from './purchase.component';
import { PurchaseOrderService } from './purchaseorder.service';
import { RouterModule } from '@angular/router';
import { SidenavModule } from '../sidenav/sidenav.module';
import {
  MatFormFieldModule, MatInputModule, MatSelectModule,
  MatTableModule, MatPaginatorModule, MatSortModule, MatCardModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../login/auth.guard';
import { ApiService } from '../config/api.service';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/Constant';
import { SharedService } from '../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';



xdescribe('PurchaseComponent', () => {
  let component: PurchaseComponent;
  let fixture: ComponentFixture<PurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([{
          path: 'purchase',
          component: PurchaseComponent,
          canActivate: [AuthGuard]
        }]),
        HttpClientModule,
        CommonModule,
        MatPaginatorModule,
        SidenavModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatSortModule,
        MatSelectModule,
        MatCardModule
    ],
      declarations: [
        PurchaseComponent
      ],
      // providers: [PurchaseOrderService]
      providers: [
        PurchaseOrderService,
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
    fixture = TestBed.createComponent(PurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
