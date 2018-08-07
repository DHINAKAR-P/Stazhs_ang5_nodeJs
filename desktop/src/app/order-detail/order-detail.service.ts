import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../config/api.service';
import { Router } from '@angular/router';
import { ConfigService } from '../config/config.service';
// tslint:disable-next-line:import-blacklist
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class OrderDetailService {
    // public orderId: String;
    private subject: Subject<any>;
    constructor(private http: HttpClient, private router: Router, private api: ApiService, private config: ConfigService) {
    }
    getOrder(orderId): Observable<any> {
        return this.api.get(this.config.api_url + '/SalesOrder/get/' + orderId);
    }
    getuserid(id): Observable<any> {
        return this.api.get(this.config.api_url + '/User/get/' + id);
    }

}

