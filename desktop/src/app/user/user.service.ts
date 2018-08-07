import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../config/config.service';
import { ApiService } from '../config/api.service';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../config/Constant';

@Injectable()
export class UserService {
    public selected_id: number;
    constructor(private _http: HttpClient, private config: ConfigService, private apiService: ApiService) { }

    getAllUser(): Observable<any> {
        return this.apiService.get(this.config.api_url + Constants.get_All_User);
    }
    getUserDetails(uuid): Observable<any> {
        return this.apiService.get(this.config.api_url + Constants.get_UserData + uuid);
    }
    getAllUserByOrg(uuid): Observable<any> {
        return this.apiService.get(this.config.api_url + Constants.get_All_User_By_Org + uuid);
    }
    getAllUserRole(): Observable<any> {
        return this.apiService.get(this.config.api_url + Constants.get_All_UserRole);
    }
    getAllUserRoleByOrg(uuid): Observable<any> {
        return this.apiService.get(this.config.api_url + Constants.get_All_UserRole_By_Org + uuid);
    }
    createUserRole(role): Observable<any> {
        return this.apiService.post(this.config.api_url + Constants.create_User_Role, role);
    }
    updateUserRole(role): Observable<any> {
        return this.apiService.put(this.config.api_url + Constants.update_User_Role, role);
    }
    createUser(user): Observable<any> {
        return this.apiService.post(this.config.api_url + Constants.create_User, user);
    }
    updateUser(user): Observable<any> {
        return this.apiService.put(this.config.api_url + Constants.update_User, user);
    }
    getUserRoleDetails(uuid): Observable<any> {
        return this.apiService.get(this.config.api_url + Constants.get_UserRole_Details + uuid);
    }
    disableUser(uuid): Observable<any> {
        return this.apiService.put(this.config.api_url + Constants.disable_User + uuid);
    }
    disableUserRole(uuid): Observable<any> {
        return this.apiService.put(this.config.api_url + Constants.disable_User_Role + uuid);
    }
    getUser(user){
        return this.apiService.get(this.config.api_url + Constants.get_user + user);
    }
    getRole(role,orgid){
        return this.apiService.get(this.config.api_url + Constants.get_roleWorg + role +'/'+orgid);
    }

    getRoleNoOrg(role){
        return this.apiService.get(this.config.api_url + Constants.get_role + role );
    }
}