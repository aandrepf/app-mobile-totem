import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './../shared/global';
import { Config } from './../models/config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class ConfigService {
  public appConfig: Config;

  constructor(private _http: HttpClient) {
    setTimeout(() => {
      this.appConfig = JSON.parse(sessionStorage.getItem('urls'));
    }, 500);
  }

  getUrls() {
    return this._http.get(Global.CONFIG);
  }
}
