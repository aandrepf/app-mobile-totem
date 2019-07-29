import { NovaSenha } from './../models/crm.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Global } from '../shared/global';
import { CatGerenciaDisponivel } from '../models/gerencia.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class GerenciaService {

  public gerente: CatGerenciaDisponivel;

  constructor(private _config: ConfigService, private _http: HttpClient) {}

  /*postCatGerencialDisponivel() {
    const body = '';
    const url = `${this._config.appConfig.urlServer}/${Global.GERENTE_DISPONIVEL}`;
    return this._http.post(url, body, httpOptions);
  }*/

  postFilaGerenteLogado(id: number) {
    const url = `${this._config.appConfig.urlServer}/${Global.GERENTE_LOGADO}`;
    this.gerente = new CatGerenciaDisponivel();
    this.gerente.idCategoria = id;
    const body = JSON.stringify(this.gerente);
    return this._http.post(url, body, httpOptions);
  }

  getBotoes() {
    const url = `${this._config.appConfig.urlServer}/${Global.BOTOES}`;
    const body = '';
    return this._http.post(url, body, httpOptions);
  }

  imprimirTicket(item: Object) {
    const url = `${this._config.appConfig.urlServer}/${Global.NOVA_SENHA}`;
    const body = JSON.stringify(item);
    return this._http.post(url, body, httpOptions);
  }
}
