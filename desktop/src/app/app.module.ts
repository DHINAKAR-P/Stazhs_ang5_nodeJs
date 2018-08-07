import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { TicketCreationModule } from './ticket/ticketcreation/ticketcreation.module';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { OrdersModule } from './orders/orders.module';
import { TicketModule } from './ticket/ticketsummary/ticket.module';
import { LoginModule } from './login/login.module';
import { PurchaseModule } from './purchase/purchase.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { PurchaseDetailModule } from './purchase-detail/purchase-detail.module';
import { UserModule } from './user/user.module';
import { UserRoleModule } from './user/user-role/user-role.module';
import { InventoryModule } from './inventory/inventory.module';
import { UsersListModule } from './user/users-list/users-list.module';
import { TicketDetailsModule } from './ticket/ticketdetails/ticketdetails.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ApiService } from './config/api.service';
import { ConfigService } from './config/config.service';
import { SharedService } from './shared/shared.service';

import { ShipmentsModule } from './shipments/shipments.module';
import { SuccessalertModule } from './successalert/successalert.module';
import { FailurealertModule } from './failurealert/failurealert.module';
import { MatDialogModule } from '@angular/material';
import { DeleteDialogComponent } from './dialog/delete-dialog/delete-dialog.component';
import { AppInterceptor } from './app.interceptor';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { OrganizationModule } from './organization/organization.module';
import { NotificationDetailsModule } from './notification-details/notification-details.module';
import { SyncServiceModule } from './sync-service/sync-service.module';
import { AlertDialogComponent } from './dialog/alert-dialog/alert-dialog.component'

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: false });

@NgModule({
  declarations: [
    AppComponent,
    DeleteDialogComponent,
    AlertDialogComponent
  ],
  imports: [
    Ng2Bs3ModalModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SuccessalertModule,
    FailurealertModule,
    BrowserAnimationsModule,
    RouterModule,
    DashboardModule,
    OrdersModule,
    TicketModule,
    OrganizationModule,
    TicketCreationModule,
    PurchaseModule,
    OrderDetailModule,
    LoginModule,
    PurchaseDetailModule,
    UserModule,
    UserRoleModule,
    InventoryModule,
    UsersListModule,
    TicketDetailsModule,
    InvoiceModule,
    ShipmentsModule,
    MatDialogModule,
    NotificationDetailsModule,
    SyncServiceModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  entryComponents: [DeleteDialogComponent,AlertDialogComponent],
  providers: [RouterModule, ApiService, ConfigService, SharedService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
