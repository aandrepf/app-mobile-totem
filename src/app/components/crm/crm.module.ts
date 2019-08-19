import { LimitPipe } from './../../shared/limit-input.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { NgxMaskModule } from 'ngx-mask'

import { MAT_KEYBOARD_LAYOUTS, MatKeyboardModule } from '@ngx-material-keyboard/core';
import { Global } from './../../shared/global';

import { CrmComponent } from './crm.component';
import { NumPadComponent } from './numpad/numpad';
import { CrmService } from './../../services/crm.service';

import { DirectivesModule } from './../../shared/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatBottomSheetModule,
    MatKeyboardModule,
    NgxMaskModule,
    DirectivesModule
  ],
  declarations: [
    CrmComponent,
    NumPadComponent,
    LimitPipe
  ],
  providers: [
    CrmService,
    { provide: MAT_KEYBOARD_LAYOUTS, useValue: Global.KeyboardCustomLayouts },
  ]
})
export class CrmModule { }
