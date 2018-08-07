import { NgModule } from '@angular/core';
import { NotificationDetailsComponent } from './notification-details.component';
import { NotificationDetailService } from './notification-details.service';

@NgModule({
    imports: [

    ],
    declarations: [
        NotificationDetailsComponent
    ],
    providers: [
        NotificationDetailService
    ],
    exports: [
        NotificationDetailsComponent
    ]
})
export class NotificationDetailsModule { }
