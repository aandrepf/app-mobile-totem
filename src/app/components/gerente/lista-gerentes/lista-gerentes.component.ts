import { AtendimentoService } from './../../../services/atendimento.service';
import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { InfoGerente } from './../../../models/gerencia.model';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Global } from '../../../shared/global';

@Component({
  selector: 'app-lista-gerentes',
  templateUrl: './lista-gerentes.component.html',
  styleUrls: ['./lista-gerentes.component.css']
})
export class ListaGerentesComponent implements OnChanges {
  @Output() transitionLeft = new EventEmitter<boolean>();
  @Output() enviaGerenteSelecionado = new EventEmitter<any>();
  @Input() categoriaId: any;

  public gerente: InfoGerente[];
  public codigoCategoria;
  public isScroll: boolean;
  public br: boolean = false;

  constructor(private _atdo: AtendimentoService, private _route: Router, private spinner: NgxSpinnerService) {
  }

  ngOnChanges() {
    if (this.categoriaId !== undefined) {
      this.spinner.show();
      this.listaGerentes(this.categoriaId.categoria.tipoCategoria.trim());
      let $card = document.querySelector<HTMLDivElement>('.card-gerente-list').offsetHeight;
      console.log('height', $card);
      this.isScroll = $card >= 850 ? true : false;
    }
  }

  onScrollUp() {
    console.log('scrolled UP!!');
  }

  onScrollDown() {
    console.log('scrolled down!!');
  }

  listaGerentes(letraCategoria: string) {
    if (Global.TIPO_ATDO.isClienteAgencia) {
      this._atdo.listaGerentes()
      .then((gerentes: InfoGerente[]) => {
        this.gerente = gerentes.filter((item: InfoGerente) => {
          if(item.emissorCaixa.politicaFormatada.indexOf(letraCategoria) !== -1) {
            return item;
          }
        });
        setTimeout(() => {
          this.codigoCategoria = this.categoriaId.categoria.id;
          this.montaBody(this.categoriaId.categoria.id);
          this.spinner.hide();
        }, 2500);
      });
    } else {
      this.br = true;
      setTimeout(() => {
        this.spinner.hide();
        const $body = document.querySelector('body');
        if(this.categoriaId.categoria.id === 7 || this.categoriaId.categoria.id === 16) {
          $body.classList.add('body-exclusive');
        } else if(this.categoriaId.categoria.id === 8 || this.categoriaId.categoria.id === 17) {
          $body.classList.add('body-prime');
        } else if(this.categoriaId.categoria.id === 9 || this.categoriaId.categoria.id === 18) {
          $body.classList.add('body-empresas');
        }
        this.enviaGerenteSelecionado.emit({gerente: 0, categoria: this.categoriaId.categoria.id});
      }, 2500);
    }
  }

  goBack() {
    this.transitionLeft.emit(true);
    const $body = document.querySelector('body');
    const $printPg = document.querySelector('[data-pg]');
    $body.classList.remove('body-exclusive', 'body-empresas', 'body-prime');
    $printPg.innerHTML = '';
  }

  confirmaGerente(idGerente: number) {
    this.enviaGerenteSelecionado.emit({gerente: idGerente, categoria: this.categoriaId.categoria.id});
  }

  montaBody(idCategoria: number) {
    const $body = document.querySelector('body');
    const $printPg = document.querySelector('[data-pg]');
    if (idCategoria === 6 || idCategoria === 15) {
      $printPg.innerHTML='<img src="./assets/logos_bradesco/classic.png" style="float: left;">';
    } else if(idCategoria === 7 || idCategoria === 16) {
      $body.classList.add('body-exclusive');
      $printPg.innerHTML='<img src="./assets/logos_bradesco/exclusive.png" style="float: left;">';
    } else if(idCategoria === 8 || idCategoria === 17) {
      $body.classList.add('body-prime');
      $printPg.innerHTML='<img src="./assets/logos_bradesco/prime.png" style="float: left;width: 220px;">';
    } else if(idCategoria === 9 || idCategoria === 18) {
      $body.classList.add('body-empresas');
      $printPg.innerHTML='<img src="./assets/logos_bradesco/pj.png" style="float: left;">';
    }
  }

}
