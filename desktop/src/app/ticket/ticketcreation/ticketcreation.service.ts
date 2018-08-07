import { Injectable } from '@angular/core';
import { ApiService } from '../../config/api.service';
import { ConfigService } from '../../config/config.service';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../config/Constant';



@Injectable()
export class TicketCreationService {
    constructor(private apiService: ApiService, private configService: ConfigService) { }
    saveTicket(ticket: any): Observable<any> {
        return this.apiService.post(this.configService.api_url + '/Ticket/create', ticket);
    }
    saveFileUrl(file: any): Observable<any> {
        return this.apiService.post(this.configService.api_url + '/file/save', file);
    }
    get_priority(){
        return this.apiService.get(this.configService.analytics_url + Constants.get_priority);
    }

    orgGetAll(): Observable<any> {
        return this.apiService.get(this.configService.api_url + Constants.orgGetAll);
    }

    sendMail(data): Observable<any> {
        return this.apiService.post(this.configService.api_url + Constants.send_Mail, data);
    }

}
