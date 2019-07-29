import { ConfirmDialogComponent } from '../../utils/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { NgxSpinnerModule } from 'ngx-spinner';

import { GerenteComponent } from './gerente.component';
import { GerenciaService } from '../../services/gerente.service';
import { ListaCategoriasComponent } from './lista-categorias/lista-categorias.component';
import { ListaGerentesComponent } from './lista-gerentes/lista-gerentes.component';
import { SlidePageComponent } from '../../utils/slide-page/slide-page.component';

import {
  PerfectScrollbarModule,
  PerfectScrollbarConfigInterface,
  PERFECT_SCROLLBAR_CONFIG
} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: false,
};

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    PerfectScrollbarModule,
    NgxSpinnerModule
  ],
  declarations: [
    GerenteComponent,
    ListaCategoriasComponent,
    ListaGerentesComponent,
    SlidePageComponent,
    ConfirmDialogComponent
  ],
  exports: [
    GerenteComponent,
    ListaCategoriasComponent,
    ListaGerentesComponent
  ],
  entryComponents: [
    ConfirmDialogComponent,
  ],
  providers: [
    GerenciaService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class GerenteModule {}
