import { Component, OnInit, HostListener, ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SlideInOutAnimation } from './animation';
import { NgxSpinnerService } from 'ngx-spinner';
import { CrmService } from './../../services/crm.service';
import { RoutingState } from './../../routingState.service';
import { Fluxo } from './../../models/config';
import { Global } from './../../shared/global';
import { VerificaUsuario, CRM } from './../../models/crm.model';
import { Pad, vkConfig } from './numpad/numpad';

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.css'],
  animations: [SlideInOutAnimation]
})
export class CrmComponent implements OnInit {
  @Input() public valorAgencia = '';
  @Input() public valorConta = '';
  @Input() public valorDv = '';

  public animationStateA = 'out';
  public animationStateB = 'out';
  public animationStateC = 'out';
  public encoutrouAgencia: boolean = true;
  public valorZeroOnLeftAG;
  public valorZeroOnLeftCC;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
   event.returnValue = false;
   event.preventDefault();
  }

  @ViewChild("agInput") agInput: ElementRef;
  @ViewChild("ccInput") ccInput: ElementRef;
  @ViewChild("dvInput") dvInput: ElementRef;

  public fluxo: Fluxo = new Fluxo('', null, '', new CRM(), null);
  public previousRoute: string[];
  public crmForm: FormGroup;
  public crmInfo: CRM;
  public idenficacaoCRM: VerificaUsuario;
  public vkConfig: vkConfig;

  constructor( private _route: Router, private routingState: RoutingState, private _crmService: CrmService,
  private fb: FormBuilder, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    setTimeout(() => {
      this.agInput.nativeElement.focus();
    }, 100);
    this.loadForm();
    this.previousRoute = this.routingState.getHistory();
    if (Global.TIPO_ATDO === undefined) {
      this.routingState.clearHistory();
      this.crmForm.reset();
      this._route.navigate(['/welcome']);
    } else {
      this.fluxo = Global.TIPO_ATDO;
      console.log('Fluxo depois de selecionar a modalidade', this.fluxo);
    }
  }

  // MONTA O FORMULÁRIO
  public loadForm(): void {
    this.crmInfo = new CRM();
    this.crmForm = this.fb.group({
      ag: ['', Validators.required],
      cc: ['', Validators.required],
      dv: ['', Validators.required]
    });
  }

  updateForm() {
    this.crmForm.setValue({
      ag: this.valorAgencia,
      cc:  this.valorConta,
      dv: this.valorDv
    });
  }

  // ABRE E FECHA O TECLADO VIRTUAL
  toggleShowDiv(divName: string) {
    this.updateForm();
    this.vkConfig = new vkConfig();
    switch(divName) {
      case 'divA':
        this.animationStateA = this.animationStateB = this.animationStateC = 'out';
        this.vkConfig.limit = 4;
        this.vkConfig.campo = 'agencia';
        this.agInput.nativeElement.setSelectionRange(this.valorAgencia.length, this.valorAgencia.length);
        setTimeout(() => {
          this.animationStateA = this.animationStateA === 'out' ? 'in' : 'out';
        }, 100);
        break;
      case 'divB':
        this.animationStateA = this.animationStateB = this.animationStateC = 'out';
        this.vkConfig.limit = 7;
        this.vkConfig.campo = 'conta';
        this.ccInput.nativeElement.setSelectionRange(this.valorConta.length, this.valorConta.length);
        setTimeout(() => {
          this.animationStateB = this.animationStateB === 'out' ? 'in' : 'out';
        }, 100);
        break;
      case 'divC':
        this.animationStateA = this.animationStateB = this.animationStateC = 'out';
        this.vkConfig.limit = 1;
        this.vkConfig.campo = 'digito';
        this.agInput.nativeElement.setSelectionRange(this.valorDv.length, this.valorDv.length);
        setTimeout(() => {
          this.animationStateC = this.animationStateC === 'out' ? 'in' : 'out';
        }, 100);
    }
  }

  // quando o cliente da ENTER NO TECLADO
  recebeFechaA(state: string) {
    this.updateForm();
    this.animationStateA = state;
    setTimeout(() => {
      this.ccInput.nativeElement.focus();
    }, 100);
  }
  recebeFechaB(state: string) {
    this.updateForm();
    this.animationStateB = state;
    setTimeout(() => {
      this.dvInput.nativeElement.focus();
    }, 100);
  }
  recebeFechaC(state: string) {
    this.animationStateC = state;
    setTimeout(() => {
      this.updateForm();
      console.log('FORMULARIO CRM incompleto?', this.crmForm.invalid);
      if(!this.crmForm.invalid) {
        this.onSubmit();
      } else {
        this.agInput.nativeElement.setSelectionRange(this.valorAgencia.length, this.valorAgencia.length)
        this.agInput.nativeElement.focus();
      }
    }, 100);
  }

  // RECEBE VALOR AO CLICAR NO TECLADO E FORMATA COM ZEROS SE HOUVER
  recebeValorAgencia(valor: Pad) {
    let pad: string;
    this.valorAgencia = valor.values.replace(/(\d{4})\d+?$/, '$1');
    pad = '0000';
    this.valorZeroOnLeftAG = pad.substring(0, pad.length - this.valorAgencia.length) + this.valorAgencia;
    this.updateForm();
  }
  recebeValorConta(valor: Pad) {
    let pad: string;
    this.valorConta = valor.values.trim().replace(/(\d{7})\d+?$/, '$1');
    pad = '0000000';
    this.valorZeroOnLeftCC = pad.substring(0, pad.length - this.valorConta.length) + this.valorConta;
    this.updateForm();
  }
  recebeValorDigito(valor: Pad) {
    let pad: string;
    this.valorDv = valor.values.trim().replace(/(\d{1})\d+?$/, '$1');
    this.updateForm();
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

  // ENVIO DO FORMULÁRIO
  public onSubmit(): void {
    this.spinner.show();
    this.fluxo.crm.ag = this.valorZeroOnLeftAG;
    this.fluxo.crm.cc = this.valorZeroOnLeftCC + this.crmForm.value.dv;
    this._crmService.validarAg(this.fluxo.crm.ag)
    .subscribe(
      (ret: any) => {
        this.encoutrouAgencia = ret.isUnidade;
      },
      (error) => void(error),
      () => {
        if(this.encoutrouAgencia) {
          this.verificaCliente(this.fluxo.crm.ag, this.fluxo.crm.cc);
        } else {
          this._route.navigate(['/error'], { queryParams: { type: 'agenciaError' } });
          this.crmForm.reset();
        }
      }
    );
  }

  // VERIFICA AGENCIA E CONTA DO CLIENTE E INFORMA SE É CADASTRADO OU NÃO
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

  // VOLTAR PARA PAGINA ANTERIOR
  public previousPage(): void {
    this._route.navigate([ this.previousRoute[this.previousRoute.indexOf('/crm') - 1] ]);
  }
}
