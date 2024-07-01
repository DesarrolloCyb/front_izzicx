import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CorsService {
  // urlApi: string = 'http://172.24.251.249:154/api';
  urlApi: string = 'http://192.168.51.210/api';


  constructor(private http: HttpClient) { }

  get(controller: string) {
    return this.http.get(`${this.urlApi}/${controller}`);
  }

  post(controller: string, data: any) {
    return this.http.post(`${this.urlApi}/${controller}`, data);
  }

  audio(audioName: string) {
    return this.urlApi + '/audios/' + audioName;
  }
}
