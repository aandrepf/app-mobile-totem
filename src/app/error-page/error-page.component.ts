import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../shared/global';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent {
  public $body = document.querySelector('body');
  public tipoErro: string;
  public errorMsg: string;
  public corTexto: string;
  public corBotao: string;
  public corTextoBotao: string;

  constructor(private _route: Router, private _activeRoute: ActivatedRoute) {
    this.$body.classList.add('bodyError');
    this._activeRoute.queryParams.subscribe((parametros: Params) => {
      this.tipoErro = parametros.type;
      console.log('tipo de erro', this.tipoErro);
      if (this.tipoErro === 'agenciaError') {
        this.errorMsg = 'AGÊNCIA E CONTA INVÁLIDA!';
      }
      if (this.tipoErro === 'atdoError') {
        this.errorMsg = 'O TIPO DE ATENDIMENTO DA SUA CONTA NÃO CORRESPONDE AO TIPO DE ATENDIMENTO SELECIONADO!'
      }
      if(this.tipoErro === 'docError') {
        const $body = document.querySelector('body');
        console.log($body.classList[0]);
        switch($body.classList[0]) {
          case 'body-exclusive':
            this.corBotao = '#cd0a2f';
            this.corTexto = '#ffffff';
            this.corTextoBotao = '#ffffff';
          break;
          case 'body-prime':
            this.corBotao = '#18417c';
            this.corTexto = '#070707';
            this.corTextoBotao = '#ffffff';
          break;
          case 'body-empresas':
            this.corBotao = '#cd0a2f';
            this.corTexto = '#ffffff';
            this.corTextoBotao = '#ffffff';
          break;
        }
        this.errorMsg = 'O TIPO DE DOCUMENTO INFORMADO, JÁ SE ENCONTRA CADASTRADO!';
      }
    });
  }

  public tryAgain(): void {
    if (this.tipoErro === 'agenciaError') {
      this._route.navigate(['/crm']);
      Global.TIPO_ATDO.crm.ag = '';
      Global.TIPO_ATDO.crm.cc = '';
      this.$body.classList.remove('bodyError');
    }

    if (this.tipoErro === 'atdoError') {
      this._route.navigate(['/']);
      this.$body.classList.remove('bodyError');
    }

    if(this.tipoErro === 'docError') {
      this._route.navigate(['/welcome']);
      Global.TIPO_ATDO.crm.nome = '';
      Global.TIPO_ATDO.crm.documento = '';
      this.$body.classList.remove('body-exclusive', 'body-prime', 'body-empresas', 'bodyError');
    }
  }
}
