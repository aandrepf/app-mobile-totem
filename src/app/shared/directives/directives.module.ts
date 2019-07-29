import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VkbmaskService } from './../../services/vkbmask.service';
import { VkbMaskDirective } from './vkb-mask.directive';
import { AutofocusDirective } from './autofocus.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    VkbMaskDirective,
    AutofocusDirective
  ],
  declarations: [
    VkbMaskDirective,
    AutofocusDirective
  ],
  providers: [VkbmaskService]
})
export class DirectivesModule { }
