import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import { SharedService } from '../shared/shared.service';

@Injectable()
export class ConfigService {

    constructor(private restapi: SharedService) {}

    private _api_url = this.restapi.baseUrl + '/api';  // this.restapi.baseUrl+

    private _auth_url = this.restapi.baseUrl + '/auth'; // this.restapi.baseUrl+

    private _login_url = this._auth_url + '/login';

    private _logout_url = this._auth_url + '/logout';

    private _analytics_url = this.restapi.analyticsUrl + '/analytics';

    private _syncservice_url = this.restapi.syncserviceUrl + '/SyncService';

    get api_url(): string {return this._api_url; }

    get login_url(): string {return this._login_url; }

    get logout_url(): string {return this._logout_url; }

    get analytics_url(): string {return this._analytics_url; }

    get sync_url(): string {return this._syncservice_url; }

}
