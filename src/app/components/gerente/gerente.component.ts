import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Fluxo } from '../../models/config';
import { CRM } from '../../models/crm.model';
import { RoutingState } from '../../routingState.service';
import { Global } from '../../shared/global';

@Component({
  selector: 'app-user-gerente',
  templateUrl: './gerente.component.html',
  styleUrls: ['./gerente.component.scss']
})
export class GerenteComponent implements OnInit {
  public fluxo: Fluxo = new Fluxo('', null, '', new CRM(), null);
  public previousRoute: string[];
  public esquerdaVisivel = true;
  public categoriaInfo;

  constructor(private _route: Router, private routingState: RoutingState) {}

  ngOnInit() {
    this.previousRoute = this.routingState.getHistory();
    if (Global.TIPO_ATDO === undefined) {
      this.routingState.clearHistory();
      this._route.navigate(['/welcome']);
    } else {
      this.fluxo = Global.TIPO_ATDO;
      console.log('Fluxo depois de ver que cliente é da AG, mas não é cadastrado', this.fluxo);
    }
  }

  visivel(visible: boolean) {
    this.esquerdaVisivel = visible;
  }

  recebeCategoria(info) {
    this.categoriaInfo = info;
  }

  recebeDadosGerente(dados: any) {
    this.fluxo.crm.idCategoria = dados.categoria;
    this.fluxo.crm.idGerente = dados.gerente;
    if (dados.gerente === 0) {
      this._route.navigate(['/print']);
    } else {
      this._route.navigate(['/crm2']);
    }
  }

  previousPage() {
    this._route.navigate(['/welcome']);
  }

}
