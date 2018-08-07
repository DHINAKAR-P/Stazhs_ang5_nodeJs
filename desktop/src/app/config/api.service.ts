import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class ApiService {

  csrfToken: string;
  token: string;

  constructor(
    private http: HttpClient
  ) {}

  private formatErrors(httpresponse: any) {
    return new ErrorObservable(httpresponse);
  }

  anonGet(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(
      `${path}`,
      {
        params
      }
    )
      .pipe(catchError(this.formatErrors));
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${path}`,
      {
        params
      }
    )
      .pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(`${path}`
    )
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${path}`,
      JSON.stringify(body)
    )
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${path}`,
      JSON.stringify(body)
    )
      .pipe(catchError(this.formatErrors));
  }

  private checkAuth(error: any) {
    if (error && error.status === 401) {

    } else {

    }
    throw error;
  }

}

