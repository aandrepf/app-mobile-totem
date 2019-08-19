import { trigger, state, style, transition,
  animate, group, query, stagger, keyframes
} from '@angular/animations';

export const SlideInOutAnimation = [
  trigger('slideInOut', [
      state('in', style({
          'height': '430px', 'opacity': '1', 'display': 'inherit', 'position': 'fixed', 'bottom': '0px', 'left': '0px', 'padding': '0px'
      })),
      state('out', style({
          'height': '0px', 'opacity': '0', 'display': 'none'
      })),
      transition('in => out', [group([
          animate('300ms ease-in-out', style({
              'opacity': '0'
          })),
          animate('600ms ease-in-out', style({
              'height': '0px'
          })),
          animate('700ms ease-in-out', style({
              'display': 'none'
          }))
      ]
      )]),
      transition('out => in', [group([
          animate('1ms ease-in-out', style({
              'display': 'inherit'
          })),
          animate('300ms ease-in-out', style({
              'height': '430px'
          })),
          animate('300ms ease-in-out', style({
              'opacity': '1'
          }))
      ]
      )])
  ]),
];
