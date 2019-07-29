import { Component, OnInit, OnChanges, HostListener, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NgxSpinnerService } from 'ngx-spinner';
import { CrmService } from './../../services/crm.service';
import { RoutingState } from './../../routingState.service';

import { Fluxo } from './../../models/config';
import { Global } from './../../shared/global';
import { VerificaUsuario, CRM } from './../../models/crm.model';
import { MatKeyboardService, MatKeyboardRef, MatKeyboardComponent } from '@ngx-material-keyboard/core';

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.css']
})
export class CrmComponent implements OnInit {
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
   event.returnValue = false;
   event.preventDefault();
  }

  public fluxo: Fluxo = new Fluxo('', null, '', new CRM(), null);
  public previousRoute: string[];
  public crmForm: FormGroup;
  public crmInfo: CRM;
  public idenficacaoCRM: VerificaUsuario;
  public encoutrouAgencia: boolean = true;
  public value: string;
  public isTipoAtdo: string;

  constructor(
    private _route: Router, private routingState: RoutingState, private _crmService: CrmService,
    private fb: FormBuilder, private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.loadForm();
    this.previousRoute = this.routingState.getHistory();
    if (Global.TIPO_ATDO === undefined) {
      this.routingState.clearHistory();
      this._route.navigate(['/welcome']);
    } else {
      this.fluxo = Global.TIPO_ATDO;
      console.log('Fluxo depois de selecionar a modalidade', this.fluxo);
    }
  }

  public onKey(value: string) {
    this.value += value;
    console.log(this.value);
  }

  public loadForm(): void {
    this.crmInfo = new CRM();
    this.crmForm = this.fb.group({
      ag: ['', [Validators.required, Validators.minLength(4)]],
      cc: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   @param clienteAg = booleando se cliente é da agencia ou não
   @param cadastroCrm = dados do cliente
  **/
  public isUsuarioAgCadastrado(agencia: number, cadastroCrm: any): void {
    if (cadastroCrm !== '') {
      if (
        !this.idenficacaoCRM.dados.prioritario && this.fluxo.tipo === 'atendimento' ||
        this.idenficacaoCRM.dados.prioritario && this.fluxo.tipo === 'prioritário'
      ) {
        this.fluxo.crm.ag = this.idenficacaoCRM.dados.ag;
        this.fluxo.crm.cc = this.idenficacaoCRM.dados.cc;
        this.fluxo.crm.nome_cliente = this.idenficacaoCRM.dados.nome;
        this.fluxo.crm.documento = this.idenficacaoCRM.dados.documento;
        this.fluxo.crm.idCategoria = this.idenficacaoCRM.dados.idCategoria;
        this.fluxo.crm.idGerente = this.idenficacaoCRM.dados.idGerente;
        this.fluxo.isClienteAgencia = this.idenficacaoCRM.isAgencia;
        this._route.navigate(['/print']);
      } else {
        this._route.navigate(['/error'], { queryParams: { type: 'atdoError' } });
      }
    } else {
      this._crmService.getAgencia()
      .then((ret) => {
        this.fluxo.isClienteAgencia = ret === agencia ? true : false;
      })
      this._route.navigate(['/usergerente']);
    }
  }

  public onSubmit(): void {
    this.spinner.show();
    this.fluxo.crm.ag = this.crmForm.value.ag;
    this.fluxo.crm.cc = this.crmForm.value.cc;
    this._crmService.validarAg(this.crmForm.value.ag)
    .subscribe(
      (ret: any) => {
        this.encoutrouAgencia = ret.isUnidade;
      },
      (error) => void(error),
      () => {
        if(this.encoutrouAgencia) {
          this.verificaCliente(this.crmForm.value.ag, this.crmForm.value.cc);
        } else {
          this._route.navigate(['/error'], { queryParams: { type: 'agenciaError' } });
          this.crmForm.reset();
        }
      }
    );
  }

  public verificaCliente(ag: string, cc: string) {
    this._crmService.verificaCadastroUsuario(ag, cc).subscribe(
      (data: VerificaUsuario) => {
        this.idenficacaoCRM = data;
      },
      (error: any) => {
        this.spinner.hide();
        this.crmForm.reset();
        void(error);
      },
      () => {
        setTimeout(() => {
          this.spinner.hide();
          this.crmForm.reset();
          this.isUsuarioAgCadastrado(+ag, this.idenficacaoCRM.dados);
        }, 1500);
      });
  }

  public previousPage(): void {
    this._route.navigate([ this.previousRoute[this.previousRoute.indexOf('/crm') - 1] ]);
  }
}
