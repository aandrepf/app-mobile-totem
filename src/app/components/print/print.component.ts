import { Subscription } from 'rxjs';
import { GerenciaService } from './../../services/gerente.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NovaSenha, CRM } from '../../models/crm.model';
import { Global } from '../../shared/global';
import { Fluxo } from '../../models/config';
import { RoutingState } from '../../routingState.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html'
})
export class PrintComponent implements OnInit {
  private _subsPrint: Subscription;
  public fluxo: Fluxo = new Fluxo('', null, '', new CRM(), null);
  public senha: string;
  public waitMsg = false;
  public printMsg = false;
  public errorMsg = false;

  public infoPrint: NovaSenha;
  public crmPrint: CRM;
  public txt: string;

  constructor(
    private route: Router,
    private _activeRoute: ActivatedRoute,
    private _gerenteService: GerenciaService,
    private routingState: RoutingState
  ) {}

  ngOnInit() {
    this.fluxo = Global.TIPO_ATDO;
    console.log('Fluxo após identificar o cliente ou cadastrar', this.fluxo);

    this.montaBody();

    this.crmPrint = new CRM();
    this.crmPrint.tipo_identificacao = 1;

    if (this.fluxo.isClienteAgencia) {
      this.crmPrint.ag = this.fluxo.crm.ag;
      this.crmPrint.cc = this.fluxo.crm.cc;
      this.crmPrint.nome_cliente = this.fluxo.crm.nome_cliente;
    }

    if (this.fluxo.crm.documento !== undefined) {
      if (this.fluxo.crm.documento.length < 14) {
        this.crmPrint.cpf = this.fluxo.crm.documento;
      } else {
        this.crmPrint.cnpj = this.fluxo.crm.documento;
      }
    }

    this.infoPrint = new NovaSenha();

    if (Global.TIPO_ATDO.isClienteAgencia) {
      this.infoPrint.crm = this.crmPrint;
      this.infoPrint.basePic = Global.IMAGE_BASE_64;
    } else {
      this.infoPrint.crm = this.crmPrint;
    }

    this.infoPrint.btnId = this.fluxo.crm.idCategoria;
    this.infoPrint.categoriaId = this.fluxo.crm.idCategoria;
    this.infoPrint.idUsuarioEscolhido = this.fluxo.crm.idGerente;

    if(this.infoPrint.idUsuarioEscolhido !== 0) {
      this.txt = 'Aguarde no espaço reservado para clientes Bradesco, logo o gerente virá até você.'
    } else {
      this.txt = 'Por favor, aguarde a chamada da sua senha no painel.'
    }
    console.log('PARAMETROS PARA IMPRESSÃO', this.infoPrint);
    this.novaSenha(this.infoPrint);
  }

  novaSenha(infos: NovaSenha) {
    this.waitMsg = true;
    setTimeout(() => {
      this._subsPrint = this._gerenteService.imprimirTicket(infos).subscribe((data: any) => {
        this.senha = data.ticket;
        this.waitMsg = false;
        this.printMsg = true;

        setTimeout(() => {
          this.volarHome();
        }, 8000);
      }, error => {
        this.waitMsg = false;
        this.errorMsg = true;

        setTimeout(() => {
          this.volarHome();
        }, 8000);
      });
    }, 3500);
  }

  volarHome() {
    this.routingState.clearHistory();
    this.route.navigate(['/welcome']);
    const $body = document.querySelector('body');
    $body.classList.remove('body-exclusive', 'body-prime', 'body-empresas');
  }

  montaBody() {
    const $body = document.querySelector('body');
    const $printPg = document.querySelector('[data-pg]');
    if (Global.TIPO_ATDO !== undefined) {
      if (Global.TIPO_ATDO.crm.idCategoria === 6 || Global.TIPO_ATDO.crm.idCategoria === 15) {
        $printPg.innerHTML='<img src="./assets/logos_bradesco/classic.png" alt="Bradesco Classic" style="float: left;">';
      } else if(Global.TIPO_ATDO.crm.idCategoria === 7 || Global.TIPO_ATDO.crm.idCategoria === 16) {
        if($body.classList.length === 0) {
          $body.classList.add('body-exclusive');
        }
        $printPg.innerHTML='<img src="./assets/logos_bradesco/exclusive.png" alt="Bradesco Exclusive" style="float: left;">';
      } else if(Global.TIPO_ATDO.crm.idCategoria === 8 || Global.TIPO_ATDO.crm.idCategoria === 17) {
        if($body.classList.length === 0) {
          $body.classList.add('body-prime');
        }
        $printPg.innerHTML='<img src="./assets/logos_bradesco/prime.png" alt="Bradesco Prime" style="float: left;width: 220px;">';
      } else if(Global.TIPO_ATDO.crm.idCategoria === 9 || Global.TIPO_ATDO.crm.idCategoria === 18) {
        if($body.classList.length === 0) {
          $body.classList.add('body-empresas');
        }
        $body.classList.add('body-empresas');
        $printPg.innerHTML='<img src="./assets/logos_bradesco/pj.png" alt="Bradesco PJ" style="float: left;">';
      }
    } else { this.route.navigate(['/']); }
  }
}
