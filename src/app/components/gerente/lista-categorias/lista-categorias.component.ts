import { AtendimentoService } from './../../../services/atendimento.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { GerenciaService } from './../../../services/gerente.service';

import { Global } from '../../../shared/global';
import { BuscaCategoriasDisponiveis, CatGerenciaDisponivel } from './../../../models/gerencia.model';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Botoes } from '../../../models/varejo.model';
import { Fluxo } from '../../../models/config';
import { CRM } from '../../../models/crm.model';
import { RoutingState } from '../../../routingState.service';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriasComponent implements OnInit, OnDestroy {
  @Output() transitionRight = new EventEmitter<boolean>();
  @Output() categoria = new EventEmitter<{}>();

  private _subsCatGerDisponivel: Subscription;

  public fluxo: Fluxo = new Fluxo('', null, '', new CRM(), null);
  public categoriasDisponiveis: BuscaCategoriasDisponiveis[];
  public categorias: Botoes[];
  public content: number;
  public previousRoute: string[];

  constructor(private _gerenciaService: GerenciaService, private routingState: RoutingState, private _route: Router, private _atdo: AtendimentoService) {}

  ngOnInit() {
    this.previousRoute = this.routingState.getHistory();
    if (Global.TIPO_ATDO === undefined) {
      this.routingState.clearHistory();
      this._route.navigate(['/welcome']);
    } else {
      this.getCategoriasDisponiveis(Global.TIPO_ATDO.crm.prioritario);
    }

  }

  ngOnDestroy() {
    if (this._subsCatGerDisponivel !== undefined) { this._subsCatGerDisponivel.unsubscribe(); }
  }

  public montaTituloPagina(): string {
    return Global.TIPO_ATDO !== undefined ? this.fluxo.tipo : '';
  }

  public mostraPrioritarioFeatures(): boolean {
    return this.montaTituloPagina() === 'prioritário' ? true : false;
  }

  public getCategoriasDisponiveis(prioritario) {
    /**
      @param local // 2 - GERENCA, 1 - CAIXA
      @param prioritario
    **/
    this._atdo.retornaBotoes(2, prioritario)
    .then((botoes: Botoes[]) => {
      this.categorias = botoes;
      this.content = this.categorias.length;
    });
  }

  public slidePage(idCategoria: number) {
    this.transitionRight.emit(false);
    const categoriaInfo = this.categorias.filter(i => i.categoria.id === idCategoria)[0];
    this.categoria.emit(categoriaInfo);
  }

  public previousPage(): void {
    this._route.navigate([ this.previousRoute[this.previousRoute.indexOf('/usergerente') - 1] ]);
  }

}
