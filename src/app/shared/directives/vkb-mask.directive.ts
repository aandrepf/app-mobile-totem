import { Directive, Input, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { VkbmaskService } from '../../services/vkbmask.service';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[vkbMask]',
})
export class VkbMaskDirective implements OnInit, OnDestroy {

    @Input('vkbMask') vkbMask: string;
    private _subscription: any;

    ngOnInit() {

        const ctrl = this._ngControl.control;
        this._subscription = ctrl.valueChanges.subscribe(v => {

            let val = '';

            switch (this.vkbMask) {
                case 'name':
                    val = this._service.formatToName(v);
                    break;
                case 'cpf':
                    val = this._service.formatToCpf(v);
                    break;
                default:
                    val = v;
                    break;
            }

            ctrl.setValue(val, { emitEvent: false });

            setTimeout(() => {
                this._elementRef.nativeElement.setSelectionRange(val.length, val.length);
                this._elementRef.nativeElement.focus();
            }, 0);

        });

    }

    ngOnDestroy() {
      this._subscription.unsubscribe();
    }

    constructor(private _service: VkbmaskService, private _ngControl: NgControl, private _elementRef: ElementRef) { }

}
