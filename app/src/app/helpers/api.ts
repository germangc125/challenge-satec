import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';


// @Injectable()


@Injectable({
    providedIn: 'root'
})

export class Api {
    baseUrl: string = 'https://apimocha.com/room-manager/'; //"http://192.168.1.36:9096/";

    constructor(public http: HttpClient) {
        //this.baseUrl =  loadConfigService.settings.apiBaseUrl;
    }


    get(endpoint: string, params?: any, reqOpts?: any): Observable<any> {
        if (!reqOpts) {
            reqOpts = {
                params: new HttpParams(),
                header: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            };
        }
        // Support easy query params for GET requests
        if (params) {
            reqOpts.params = new HttpParams();
            for (let k in params) {
                reqOpts.params = reqOpts.params.set(k, params[k]);
            }
        }

        return this.http.get(this.baseUrl + endpoint, reqOpts);
    }

    post(endpoint: string, body: any, reqOpts?: any): Observable<any> {
        return this.http.post<any>(this.baseUrl + endpoint, body, reqOpts);
    }

    put(endpoint: string, body: any, reqOpts?: any): Observable<any> {
        return this.http.put(this.baseUrl + endpoint, body, reqOpts);
    }

    delete(endpoint: string, params?: any, reqOpts?: any) {

        if (!reqOpts) {
            reqOpts = {
                params: new HttpParams(),
                header: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            };
        }
        // Support easy query params for GET requests
        if (params) {
            reqOpts.params = new HttpParams();
            for (let k in params) {
                reqOpts.params = reqOpts.params.set(k, params[k]);
            }
        }
        return this.http.delete(this.baseUrl + endpoint, reqOpts);
    }

    patch(endpoint: string, body: any, reqOpts?: any): Observable<any> {
        return this.http.patch(this.baseUrl + endpoint, body, reqOpts);
    }
}
