import { Config } from './../../models/config';
import { Botoes } from './../../models/varejo.model';
import { Component, OnInit } from '@angular/core';
import { Global } from './../../shared/global';
import { Router } from '@angular/router';
import { Fluxo } from '../../models/config';
import { RoutingState } from '../../routingState.service';
import { CRM } from '../../models/crm.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  public tipoAtendimento: Fluxo = new Fluxo('', null, '', new CRM(), null);
  public previousRoute: string[];
  public botoes: Botoes[];

  constructor(private _route: Router, private routingState: RoutingState, private _http: HttpClient) {}

  ngOnInit() {
    this.previousRoute = this.routingState.getHistory();
    if (Global.TIPO_ATDO === undefined) {
      this.routingState.clearHistory();
      this._route.navigate(['/welcome']);
    } else {
      console.log('Fluxo depois selecionado tipo', Global.TIPO_ATDO);
      this.tipoAtendimento.tipo = Global.TIPO_ATDO.tipo;
      this.retornaBotoes80(Global.TIPO_ATDO.crm.prioritario);
    }
  }

  public retornaBotoes80(prioritario: boolean) {
    if (prioritario) {
      let configUrl: Config = JSON.parse(sessionStorage.getItem('urls'));
      const url = `${configUrl.urlServer}/${Global.BOTOES}`;
      this._http.post(url, '', httpOptions).toPromise()
      .then((req: Botoes[]) => {
        this.botoes = req.filter((item: Botoes) => {
          return item.prioritario === prioritario && item.descricao.indexOf('80+') !== -1;
        });
      })
      .catch(() => void(0))
    }
  }

  public montaTituloPagina(): string {
    return Global.TIPO_ATDO !== undefined ? this.tipoAtendimento.tipo : '';
  }

  public mostraPrioritarioFeatures(): boolean {
    return this.montaTituloPagina() === 'prioritário' ? true : false;
  }

  public validaCliente(isCliente: boolean) {
    Global.TIPO_ATDO.isCorrentista = isCliente;
    this._route.navigate(['/modalidade']);
  }

  public previousPage() {
    const previous = this.previousRoute[this.previousRoute.indexOf('/crm') - 1];
    if (previous === '/identificacao' || '/')
      this.routingState.clearHistory();
      this._route.navigate(['/welcome']);
  }

  public print(idCategoria: number): void {
    Global.TIPO_ATDO.crm.idCategoria = idCategoria;
    Global.TIPO_ATDO.crm.idGerente = 0;
    this._route.navigate(['/print']);
  }
}
