import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

type OrigemPainel = 'left' | 'right';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'slide-page',
  templateUrl: './slide-page.component.html',
  styleUrls: ['./slide-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slide', [
      state('left', style({ transform: 'translateX(0)' })),
      state('right', style({ transform: 'translateX(-50%)'})),
      transition('* => *', animate(200))
    ])
  ]
})
export class SlidePageComponent {
  @Input() painelAtivo: OrigemPainel = 'left';
}
