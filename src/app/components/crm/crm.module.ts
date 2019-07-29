import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { NgxMaskModule } from 'ngx-mask'

import { MAT_KEYBOARD_LAYOUTS, MatKeyboardModule } from '@ngx-material-keyboard/core';
import { Global } from './../../shared/global';

import { CrmComponent } from './crm.component';
import { CrmService } from './../../services/crm.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatKeyboardModule,
    NgxMaskModule
  ],
  declarations: [
    CrmComponent
  ],
  providers: [
    CrmService,
    { provide: MAT_KEYBOARD_LAYOUTS, useValue: Global.KeyboardCustomLayouts },
  ]
})
export class CrmModule { }
