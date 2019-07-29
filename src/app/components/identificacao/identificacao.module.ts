import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// external modules
import { NgxMaskModule, MaskService } from 'ngx-mask';

// components
import { IdentificacaoComponent } from './identificacao.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { WebcamModule } from 'ngx-webcam';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    NgxSpinnerModule,
    WebcamModule
  ],
  declarations: [
    IdentificacaoComponent
  ],
  exports: [
    IdentificacaoComponent
  ],
  providers: [MaskService]
})
export class IdentificacaoModule { }
