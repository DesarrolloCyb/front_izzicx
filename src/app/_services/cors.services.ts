import { Injectable } from '@angular/core';

import {
    HttpClient,
    HttpParams,
    HttpErrorResponse,
} from '@angular/common/http';

import 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CorsService {
    private headers: Headers = new Headers({});
    constructor(private httpClient: HttpClient) {}

    post(partUrl: string, dataGet: any = {}): Promise<any> {
        return this.httpClient
            .post(`${environment.API_URL}${partUrl}`, dataGet, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .toPromise();
    }
    get(partUrl: string, dataGet: any = {}): Promise<any> {
        const params = new HttpParams({
            fromObject: dataGet,
        });

        return this.httpClient
            .get(`${environment.API_URL}${partUrl}?${params}`)
            .toPromise();
    }
    put(partUrl: string, dataGet: any = {}): Promise<any> {
        let body = new HttpParams({ fromObject: dataGet });

        return this.httpClient
            .put(`${environment.API_URL}${partUrl}`, body.toString(), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .toPromise();
    }

    delete(partUrl: string, dataGet: any = {}): Promise<any> {
        let body = new HttpParams({ fromObject: dataGet });

        return this.httpClient
            .delete(`${environment.API_URL}${partUrl}`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .toPromise();
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0 && error.error instanceof ProgressEvent) {
            // A client-side or network error occurred. Handle it accordingly.
        }
    }
}
