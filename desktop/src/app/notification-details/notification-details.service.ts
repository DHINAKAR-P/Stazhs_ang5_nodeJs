import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { ApiService } from '../config/api.service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class NotificationDetailService {
    constructor(private configService: ConfigService, private apiService: ApiService) { }

    getNotificationDetails(userDetails: any): Observable<any> {
        return this.apiService.put(this.configService.api_url + '/SalesOrder/getNotificationDetails', userDetails);
    }

}
