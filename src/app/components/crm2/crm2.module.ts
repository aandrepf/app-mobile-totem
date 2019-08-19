import { KeypadComponent } from './keypad/keypad';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { NgxMaskModule } from 'ngx-mask'
import { NumPadComponent } from './numpad/numpad';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { MAT_KEYBOARD_LAYOUTS, MatKeyboardModule } from '@ngx-material-keyboard/core';
import { Global } from './../../shared/global';

import { Crm2Component } from './crm2.component';
import { CrmService } from './../../services/crm.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatBottomSheetModule,
    MatKeyboardModule,
    NgxMaskModule
  ],
  declarations: [
    Crm2Component,
    NumPadComponent,
    KeypadComponent
  ],
  providers: [
    CrmService,
    { provide: MAT_KEYBOARD_LAYOUTS, useValue: Global.KeyboardCustomLayouts },
  ]
})
export class Crm2Module { }
