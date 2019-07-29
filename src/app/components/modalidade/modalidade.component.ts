import { Botoes } from './../../models/varejo.model';
import { AtendimentoService } from './../../services/atendimento.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from './../../shared/global';
import { RoutingState } from '../../routingState.service';
import { Fluxo } from '../../models/config';
import { CRM } from '../../models/crm.model';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-modalidade',
  templateUrl: './modalidade.component.html',
  styleUrls: ['./modalidade.component.css'],
  animations: [
    trigger('changeDivSize', [
      state('initial', style({
        opacity: 1,
        display: 'inherit'
      })),
      state('final', style({
        opacity: 0,
        'display': 'none'
      })),
      transition('initial=>final', animate('100ms ease-in-out')),
      transition('final=>initial', animate('400ms ease-in-out'))
    ]),
  ]
})
export class ModalidadeComponent implements OnInit {
  public fluxo: Fluxo = new Fluxo('', null, '', new CRM(), null);
  public previousRoute: string[];
  public botoes: Botoes[];
  public stateOutros: string;
  public stateBotoes: string;

  constructor(private _route: Router, private routingState: RoutingState, private _atdo: AtendimentoService) {}

  ngOnInit() {
    this.previousRoute = this.routingState.getHistory();
    if (Global.TIPO_ATDO === undefined) {
      this.routingState.clearHistory();
      this._route.navigate(['/welcome']);
    } else {
      console.log('Fluxo depois de validar se cliente é correntista', Global.TIPO_ATDO);
      this.fluxo.isCorrentista = Global.TIPO_ATDO.isCorrentista;
      if (this.fluxo.isCorrentista) {
        this.stateBotoes = 'final';
        this.stateOutros = 'initial';
      } else {
        this.stateBotoes = 'initial';
        this.stateOutros = 'final';
      }
      this.fluxo.crm.prioritario = Global.TIPO_ATDO.crm.prioritario;
      this.mostraBotoesPorModalidade(this.fluxo.isCorrentista, this.fluxo.crm.prioritario);
    }
  }

  public mostraBotoesPorModalidade(correntista: boolean, prioritario: boolean): void {
    let modalidade = correntista && prioritario;
    let local = modalidade ? 2 : 1;
    if (correntista === false) {
      /**
        @param local
        @param isPrioritario
      **/
      this._atdo.retornaBotoes(local, prioritario)
      .then((botoes: Botoes[]) => {
        if (prioritario) {
          this.botoes = botoes.filter((item) => {
            return item.descricao.indexOf('80+') === -1;
          })
        } else {
          this.botoes = botoes;
        }
      });
    } else {
      this._atdo.retornaBotoes(1, prioritario)
      .then((botoes: Botoes[]) => {
        this.botoes = botoes.filter((item) => {
          return item.descricao.indexOf('CONTA') === -1 && item.descricao.indexOf('80+') === -1;
        });
      });
    }
  }

  public mostraNotCorrentistaFeatures(): boolean {
    return this.fluxo.isCorrentista;
  }

  public mostraPrioritarioFeatures(): boolean {
    return this.fluxo.crm.prioritario;
  }

  public changeState() {
    this.stateOutros = this.stateOutros === 'initial' ? 'final' : 'initial';
    this.stateBotoes = this.stateBotoes = 'final' ? 'initial' : 'final';
  }

  public seleciontaTipoServico(servico: string) {
    Global.TIPO_ATDO.modalidade = servico;
    if (servico === 'gerente')
      this._route.navigate(['/crm']);

    if (servico === 'outros_servicos')
      this.changeState();
  }

  public previousPage() {
    this._route.navigate([ this.previousRoute[this.previousRoute.indexOf('/modalidade') - 1] ]);
  }

  public print(idCategoria: number): void {
    Global.TIPO_ATDO.crm.idCategoria = idCategoria;
    Global.TIPO_ATDO.crm.idGerente = 0;
    this._route.navigate(['/print']);
  }

}
