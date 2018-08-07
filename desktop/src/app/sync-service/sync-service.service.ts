import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../config/api.service';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/Constant';



@Injectable()
export class SyncService {
    constructor(private apiService: ApiService, private configService: ConfigService, private constants: Constants) { }
    
    updateFrequency(data): Observable <any> {
        return this.apiService.put(this.configService.sync_url + '/frequency/update', data );
    }
    getFrequency(): Observable<any> {
        return this.apiService.get(this.configService.sync_url + '/frequency/get/');
    }

}
