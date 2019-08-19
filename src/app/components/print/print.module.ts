import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintComponent } from './print.component';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    PrintComponent
  ],
  exports: [
    PrintComponent
  ]
})
export class PrintModule { }
