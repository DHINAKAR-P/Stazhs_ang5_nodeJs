import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../config/config.service';
import { ApiService } from '../config/api.service';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../config/Constant';

@Injectable()
export class InventoryService {
    public selected_id: number;
    constructor(private _http: HttpClient, private config: ConfigService, private apiService: ApiService) { }

    getAllActiveInventories(): Observable<any> {
        return this.apiService.get(this.config.api_url + Constants.GetAll_Active_Inventories);
    }
    getAllInventories(): Observable<any> {
        return this.apiService.get(this.config.api_url + Constants.GetAll_Inventory);
    }
    getInventorybyId(id): Observable<any>{
        return this.apiService.get(this.config.api_url + '/Inventory/get/' + id);
    }
    getInventoryitems(id): Observable<any> {
        return this.apiService.get(this.config.api_url + '/InventoryItems/get/' + id);
    }
}
