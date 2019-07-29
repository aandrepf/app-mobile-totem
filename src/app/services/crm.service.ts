import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from '../shared/global';

import { map } from 'rxjs/operators/map';
import { ConfigService } from './config.service';
import { VerificaUsuario, CRM } from '../models/crm.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class CrmService {

  constructor(private _http: HttpClient, private _config: ConfigService) {}

  public getAgencia(): Promise<number> {
    const url = `${this._config.appConfig.urlServer}/${Global.AGENCIA}`;
    return this._http.post(url, '', httpOptions).toPromise()
      .then((req: any) => {
        return req.idAgencia;
      })
      .catch(() => void(0))
  }

  public verificaCadastroUsuario(ag: string, conta: string): Observable<VerificaUsuario> {
    const body = JSON.stringify({ag: ag, cc: conta});
    const url = `${this._config.appConfig.urlCrm}/${Global.IDENTIFICA_USUARIO}`;
    return this._http.post(url, body).pipe(
      map((res: VerificaUsuario) => {
        return res;
      })
    );
  }

  public cadastraUsuario(dados: CRM): Observable<any> {
    const body = JSON.stringify(dados);
    const url = `${this._config.appConfig.urlCrm}/${Global.CADASTRA_USUARIO}`;
    return this._http.post(url, body).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  public validarAg(unidade: number): Observable<any> {
    const body = JSON.stringify({codUnidade: unidade});
    console.log(body);
    const url = `${this._config.appConfig.urlCrm}/${Global.UNIDADE_VALIDA}`;
    return this._http.post(url, body).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
