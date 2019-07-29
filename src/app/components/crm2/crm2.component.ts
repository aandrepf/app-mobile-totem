import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RoutingState } from '../../routingState.service';
import { CrmService } from '../../services/crm.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { Fluxo } from '../../models/config';
import { CRM } from '../../models/crm.model';
import { Global } from '../../shared/global';
import { ValidateBrService } from 'angular-validate-br';

@Component({
  selector: 'app-crm2',
  templateUrl: './crm2.component.html',
  styleUrls: ['./crm2.component.css']
})
export class Crm2Component implements OnInit {
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
   event.returnValue = false;
   event.preventDefault();
  }
  public fluxo: Fluxo = new Fluxo('', null, '', new CRM(), null);
  public previousRoute: string[];
  public crmPFform: FormGroup;
  public crmPJform: FormGroup;
  public crm2Info: CRM;
  public documentoCadastrado: boolean;

  public isEmpresa: boolean; // 1 - pessoa fisica || 2 - pessoa juridica

  constructor(
    private _route: Router, private routingState: RoutingState, private _crmService: CrmService,
    private fb: FormBuilder, private spinner: NgxSpinnerService, private validate: ValidateBrService
  ) {
    if (Global.TIPO_ATDO !== undefined) {

    }
  }

  ngOnInit() {
    this.loadForm();
    this.previousRoute = this.routingState.getHistory();
    if (Global.TIPO_ATDO === undefined) {
      this.routingState.clearHistory();
      this._route.navigate(['/welcome']);
    } else {
      this.fluxo = Global.TIPO_ATDO;
      console.log('Fluxo depois de fazer a seleção do gerente', this.fluxo);
      this.isEmpresa = this.fluxo.crm.idCategoria === 9 || this.fluxo.crm.idCategoria === 18;
      this.montaBody(this.fluxo.crm.idCategoria);
    }
  }

  public loadForm(): void {
    this.crm2Info = new CRM();
    this.crmPFform = this.fb.group({
      nome: ['', Validators.required],
      cpf: [ '', [Validators.required, this.validate.cpf] ]
    });
    this.crmPJform = this.fb.group({
      razao: ['', Validators.required],
      cnpj: [ '', [Validators.required, this.validate.cnpj] ]
    });
  }

  public onSubmit(): void {
    this.spinner.show();
    let dadosCadastro = new CRM();
    dadosCadastro.ag = this.fluxo.crm.ag;
    dadosCadastro.cc = this.fluxo.crm.cc;
    dadosCadastro.prioritario = this.fluxo.crm.prioritario;
    dadosCadastro.idCategoria = this.fluxo.crm.idCategoria;
    dadosCadastro.idGerente = this.fluxo.crm.idGerente;

    if(this.crmPFform.value.nome === '' && this.crmPFform.value.cpf === '') {
      dadosCadastro.nome = this.crmPJform.value.razao.toUpperCase();
      this.fluxo.crm.nome_cliente = this.crmPJform.value.razao.toUpperCase();
      dadosCadastro.documento = this.crmPJform.value.cnpj;
      this.fluxo.crm.documento = this.crmPJform.value.cnpj;
    }

    if(this.crmPJform.value.razao === '' && this.crmPJform.value.cnpj === '') {
      dadosCadastro.nome = this.crmPFform.value.nome.toUpperCase();
      this.fluxo.crm.nome_cliente = this.crmPFform.value.nome.toUpperCase();
      dadosCadastro.documento = this.crmPFform.value.cpf;
      this.fluxo.crm.documento = this.crmPFform.value.cpf;
    }

    console.log('Fluxo depois de confirmado todos os dados', this.fluxo);

    this._crmService.cadastraUsuario(dadosCadastro).subscribe(
    (retorno: any) => {
      this.documentoCadastrado = !retorno.status;
    },
    (error: any) => {
      this.spinner.hide();
      this.crmPFform.reset();
      this.crmPJform.reset();
      void(error);
    },
    () => {
      if(this.documentoCadastrado === true) {
        setTimeout(() => {
          this.spinner.hide();
          this.crmPFform.reset();
          this.crmPJform.reset();
          this._route.navigate(['/error'], { queryParams: { type: 'docError' } });
        }, 2500);
      } else {
        setTimeout(() => {
          this.spinner.hide();
          this.crmPFform.reset();
          this.crmPJform.reset();
          this._route.navigate(['/print']);
        }, 2500);
      }
    });
  }

  public previousPage(): void {
    const $body = document.querySelector('body');
    $body.classList.remove('body-exclusive', 'body-empresas', 'body-prime');
    this._route.navigate([ this.previousRoute[this.previousRoute.indexOf('/crm2') - 1] ]);
  }

  public montaBody(idCategoria: number) {
    const $printPg = document.getElementById('crm2');
    if (idCategoria === 6 || idCategoria === 15) {
      $printPg.innerHTML='<img src="./assets/logos_bradesco/classic.png" alt="Bradesco Classic" style="float: left;">';
    } else if(idCategoria === 7 || idCategoria === 16) {
      $printPg.innerHTML='<img src="./assets/logos_bradesco/exclusive.png" alt="Bradesco Exclusive" style="float: left;">';
    } else if(idCategoria === 8 || idCategoria === 17) {
      $printPg.innerHTML='<img src="./assets/logos_bradesco/prime.png" alt="Bradesco Prime" style="float: left;width: 220px;">';
    } else if(idCategoria === 9 || idCategoria === 18) {
      $printPg.innerHTML='<img src="./assets/logos_bradesco/pj.png" alt="Bradesco PJ" style="float: left;">';
    }
  }
}
