import { Injectable } from '@angular/core';
import { ApiService } from '../../config/api.service';
import { ConfigService } from '../../config/config.service';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../config/Constant';

@Injectable()
export class TicketDetailService {
    constructor(private apiService: ApiService, private config: ConfigService, private configService: ConfigService) {

    }
    getTicketByUuid(uuid: any): Observable<any> {
        return this.apiService.get(this.configService.api_url + `/Ticket/get/${uuid}`);
    }
    getAllUserByOrg(uuid): Observable<any> {
        return this.apiService.get(this.config.api_url + Constants.get_All_User_By_Org + uuid);
    }
    update_Ticket(data): Observable<any> {
        // console.log('--------------check-------------------',data);
        return this.apiService.put(this.config.api_url + Constants.update_Ticket, data);
    }
    sendMail(data): Observable<any> {
        return this.apiService.post(this.config.api_url + Constants.send_Mail, data);
    }
    getReason(): Observable<any> {
        return this.apiService.get(this.config.api_url + Constants.getcloseReason);
    }
    getAllUser(): Observable<any> {
        return this.apiService.get(this.configService.api_url + Constants.get_All_User);
    }
    orgGetAll(): Observable<any> {
        return this.apiService.get(this.configService.api_url + Constants.orgGetAll);
    }
    createAssignedUserTicket(Object: any): Observable<any> {
        return this.apiService.post(this.configService.api_url + Constants.createAssignedUserTicket, Object);
    }
}
