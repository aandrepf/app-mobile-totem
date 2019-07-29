import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { WelcomeComponent } from './welcome.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WelcomeComponent
  ],
  exports: [
    WelcomeComponent
  ]
})
export class WelcomeModule { }
