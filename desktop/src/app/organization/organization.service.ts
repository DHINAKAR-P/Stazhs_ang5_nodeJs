import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../config/api.service';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/Constant';



@Injectable()
export class OrganizationService {
    constructor(private apiService: ApiService, private configService: ConfigService, private constants: Constants) { }
    getAllOrganization(): Observable<any> {
        return this.apiService.get(this.configService.api_url + '/Organization/getall');
    }
    saveOrganization(Organization): Observable<any> {
        return this.apiService.post(this.configService.api_url + '/Organization/create', Organization);
    }
    deleteOrganization(uuid): Observable <any> {
        return this.apiService.delete(this.configService.api_url + '/Organization/delete/' + uuid );
    }
    updateOrganization(Organization): Observable <any> {
        return this.apiService.put(this.configService.api_url + '/Organization/update', Organization );
    }
    getOrganizationbyid(id): Observable<any> {
        return this.apiService.get(this.configService.api_url + '/Organization/get/' + id);
    }

    uploadOrganization(Organization) {
        console.log("file in service condtion----------->", Organization);
        return this.apiService.post(this.configService.api_url + '/Organization/upload', Organization );
    }
}
