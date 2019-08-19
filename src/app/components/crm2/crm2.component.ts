import { Component, OnInit, HostListener, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RoutingState } from '../../routingState.service';
import { CrmService } from '../../services/crm.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { Fluxo } from '../../models/config';
import { CRM } from '../../models/crm.model';
import { Global } from '../../shared/global';
import { ValidateBrService } from 'angular-validate-br';
import { SlideInOutAnimation } from './animation';
import { vkConfig } from './numpad/numpad';

@Component({
  selector: 'app-crm2',
  templateUrl: './crm2.component.html',
  styleUrls: ['./crm2.component.css'],
  animations: [SlideInOutAnimation]
})
export class Crm2Component implements OnInit {
  @Input() public valorCPF = '';
  @Input() public valorCNPJ = '';
  @Input() public valorNome = '';
  @Input() public valorRazao = '';

  public animationStateA = 'out';
  public animationStateB = 'out';
  public animationStateC = 'out';
  public animationStateD = 'out';
  public disableConfirm = true;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
   event.returnValue = false;
   event.preventDefault();
  }

  @ViewChild("nomeInput") nomeInput: ElementRef;
  @ViewChild("cpfInput") cpfInput: ElementRef;
  @ViewChild("razaoInput") razaoInput: ElementRef;
  @ViewChild("cnpjInput") cnpjInput: ElementRef;

  public fluxo: Fluxo = new Fluxo('', null, '', new CRM(), null);
  public previousRoute: string[];
  public crmPFform: FormGroup;
  public crmPJform: FormGroup;
  public crm2Info: CRM;
  public documentoCadastrado: boolean;
  public vkConfig: vkConfig;

  public isEmpresa: boolean; // 1 - pessoa fisica || 2 - pessoa juridica

  constructor(
    private _route: Router, private routingState: RoutingState, private _crmService: CrmService,
    private fb: FormBuilder, private spinner: NgxSpinnerService, private validate: ValidateBrService
  ) {}

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
      if(this.isEmpresa === false) {
        setTimeout(() => {
          this.nomeInput.nativeElement.focus();
        }, 100);
      } else {
        setTimeout(() => {
          this.razaoInput.nativeElement.focus();
        }, 100);
      }
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

  updateFormPF() {
    this.crmPFform.setValue({
      nome: this.valorNome,
      cpf:  this.valorCPF
    });
  }

  updateFormPJ() {
    this.crmPJform.setValue({
      razao: this.valorRazao,
      cnpj:  this.valorCNPJ
    });
  }

  // ABRE E FECHA O TECLADO VIRTUAL
  toggleShowDiv(divName: string) {
    this.updateFormPF();
    this.updateFormPJ();
    this.vkConfig = new vkConfig();
    switch(divName) {
      case 'divA':
        this.animationStateA = this.animationStateB = 'out';
        this.nomeInput.nativeElement.setSelectionRange(this.valorNome.length, this.valorNome.length);
        setTimeout(() => {
          this.animationStateA = this.animationStateA === 'out' ? 'in' : 'out';
        }, 100);
        break;
      case 'divB':
        this.animationStateA = this.animationStateB = 'out';
        this.vkConfig.limit = 11;
        this.vkConfig.campo = 'cpf';
        this.cpfInput.nativeElement.setSelectionRange(this.valorCPF.length, this.valorCPF.length);
        setTimeout(() => {
          this.animationStateB = this.animationStateB === 'out' ? 'in' : 'out';
        }, 100);
        break;
      case 'divC':
        this.animationStateC = this.animationStateD = 'out';
        this.razaoInput.nativeElement.setSelectionRange(this.valorRazao.length, this.valorRazao.length);
        setTimeout(() => {
          this.animationStateC = this.animationStateC === 'out' ? 'in' : 'out';
        }, 100);
        break;
      case 'divD':
        this.animationStateC = this.animationStateD = 'out';
        this.vkConfig.limit = 14;
        this.vkConfig.campo = 'cnpj';
        this.cnpjInput.nativeElement.setSelectionRange(this.valorCNPJ.length, this.valorCNPJ.length);
        setTimeout(() => {
          this.animationStateD = this.animationStateD === 'out' ? 'in' : 'out';
        }, 100);
        break;
    }
  }

  // quando o cliente da ENTER NO TECLADO
  recebeFechaA(state: string) {
    this.updateFormPF();
    this.animationStateA = state;
    setTimeout(() => {
      if (this.valorNome !== '' && this.valorCPF !== '') {
        this.disableConfirm = false;
      }
      this.cpfInput.nativeElement.focus();
    }, 100);
  }
  recebeFechaB(state: string) {
    this.animationStateB = state;
    setTimeout(() => {
      this.updateFormPF();
      console.log('FORMULARIO PF incompleto?', this.crmPFform.invalid);
      if(!this.crmPFform.invalid) {
        this.onSubmit();
      } else {
        this.nomeInput.nativeElement.setSelectionRange(this.valorNome.length, this.valorNome.length)
        this.nomeInput.nativeElement.focus();
      }
    }, 100);
  }
  recebeFechaC(state: string) {
    this.updateFormPJ();
    this.animationStateC = state;
    setTimeout(() => {
      this.cnpjInput.nativeElement.focus();
    }, 100);
  }
  recebeFechaD(state: string) {
    this.animationStateD = state;
    setTimeout(() => {
      this.updateFormPJ();
      console.log('FORMULARIO PJ incompleto?', this.crmPJform.invalid);
      if(!this.crmPJform.invalid) {
        this.onSubmit();
      } else {
        this.razaoInput.nativeElement.setSelectionRange(this.valorRazao.length, this.valorRazao.length)
        this.razaoInput.nativeElement.focus();
      }
    }, 100);
  }

  // RECEBE VALOR AO CLICAR NO TECLADO E FORMATA COM ZEROS SE HOUVER
  recebeValueNome(valor: any) {
    this.valorNome = valor.values;
    this.updateFormPF();
  }
  recebeValueCPF(valor: any) {
    this.valorCPF = valor.values.replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
    this.updateFormPF();
  }
  recebeValueRazao(valor: any) {
    this.valorRazao = valor.values;
    this.updateFormPJ();
  }
  recebeValueCNPJ(valor: any) {
    this.valorCNPJ = valor.values.replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
    this.updateFormPJ();
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
      dadosCadastro.documento = this.crmPJform.value.cnpj.split(/\D/g).join('');
      this.fluxo.crm.documento = this.crmPJform.value.cnpj.split(/\D/g).join('');
    }

    if(this.crmPJform.value.razao === '' && this.crmPJform.value.cnpj === '') {
      dadosCadastro.nome = this.crmPFform.value.nome.toUpperCase();
      this.fluxo.crm.nome_cliente = this.crmPFform.value.nome.toUpperCase();
      dadosCadastro.documento = this.crmPFform.value.cpf.split(/\D/g).join('');
      this.fluxo.crm.documento = this.crmPFform.value.cpf.split(/\D/g).join('');
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
