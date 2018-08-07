import { Component, OnInit } from '@angular/core';
import { NotificationDetailService } from './notification-details.service';

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.css']
})
export class NotificationDetailsComponent implements OnInit {

  private currentUser: {};
  constructor(private notificationService: NotificationDetailService) { }

  ngOnInit() {
    const json = JSON.parse(sessionStorage.getItem('currentUser'));
    this.currentUser = json.user;
    this.getNotificationInfo();
  }
  getNotificationInfo() {
    this.notificationService.getNotificationDetails(this.currentUser).subscribe(
      data => {
        console.log('successs to get the notification ---- ', data);
      },
      error => {
        console.log('failure to get the notification ---- ', error);
      }
    );
  }

}
