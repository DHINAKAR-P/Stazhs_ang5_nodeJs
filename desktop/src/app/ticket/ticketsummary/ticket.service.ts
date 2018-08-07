import { Injectable } from '@angular/core';
import { ApiService } from '../../config/api.service';
import { ConfigService } from '../../config/config.service';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class TicketService {
    constructor(private apiService: ApiService, private configService: ConfigService) { }
    // createTicket(data: any): Observable<any> {
    //     return this.apiService.post(this.configService.api_url + '/Ticket/create', data);
    // }
    getAllTicket(): Observable<any> {
        return this.apiService.get(this.configService.api_url + '/Ticket/getall');
    }
    getAllTicketByOrg(uuid): Observable<any> {
        return this.apiService.get(this.configService.api_url + '/Ticket/getbyorg/' + uuid);
    }
}
