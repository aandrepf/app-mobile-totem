import { Botoes } from './../models/varejo.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from '../shared/global';
import { ConfigService } from './config.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AtendimentoService {
  public voltaPagina = [];

  constructor(private _http: HttpClient, private _config: ConfigService) {}

  public retornaBotoes(local: number, isPrioritario: boolean): Promise<Botoes[]> {
    const url = `${this._config.appConfig.urlServer}/${Global.BOTOES}`;
    return this._http.post(url, '', httpOptions).toPromise()
      .then((req: Botoes[]) => {
        return req.filter((item: Botoes) => {
          return item.prioritario === isPrioritario && item.categoria.localAtendimento.idLocalAtendimento === local;
        });
      })
      .catch(() => void(0))
  }

  public listaGerentes(): Promise<any> {
    const url = `${this._config.appConfig.urlServer}/${Global.GERENTES}`;
    return this._http.post(url, '', httpOptions).toPromise()
      .then((req: any) => {
        return req;
      })
      .catch(() => void(0))
  }
}
