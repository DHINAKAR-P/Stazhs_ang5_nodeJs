import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../config/api.service';
import { Router } from '@angular/router';
import { ConfigService } from '../config/config.service';
// tslint:disable-next-line:import-blacklist
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class LoginService {
    private subject: Subject<any>;
    constructor(private http: HttpClient, private router: Router, private api: ApiService, private config: ConfigService) {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.subject = new BehaviorSubject<any>(currentUser);
    }
    login(username: String, password: String): Observable<any> {
        return this.http.post(this.config.login_url, { username: username, password: password });
    }
    logout(userDetails) {
        console.log(' logout method calling ');
        this.subject.next();
        this.router.navigate(['']);
        sessionStorage.removeItem('currentUser');
        sessionStorage.clear();
        return this.http.post(this.config.logout_url, userDetails);
    }
    getStatus(): Observable<any> {
        return this.subject.asObservable();
    }
}

