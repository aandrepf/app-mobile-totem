import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';

export class Pad {
  values: string;
  animation: string;
  input: string;
}

export class vkConfig {
  limit: number;
  campo: string;
}

@Component({
  selector: 'numpad',
  templateUrl: './numpad.html',
  styleUrls: ['./numpad.css'],
})
export class NumPadComponent implements OnInit {
  @Input() config: vkConfig;
  @Output() numValue: EventEmitter<Pad> = new EventEmitter();
  @Output() fechaPad: EventEmitter<Pad> = new EventEmitter();
  padVal: Pad;

  public values = '';

  constructor(private bottomSheet: MatBottomSheet, private route: Router) {}

  ngOnInit() { localStorage.clear(); }

  addValue(valor: string) {
    this.values += valor;
    if (this.values.length > this.config.limit) {
      this.values = this.values.substring(0, this.values.length - 1);
    }
    const padValues = new Pad();
    padValues.values = this.values.substring(0, this.config.limit);
    padValues.animation = '';
    padValues.input = this.config.campo;
    this.numValue.emit(padValues);
  }

  apagaValor() {
    this.values = this.values.substring(0, this.values.length - 1);
    const padValues = new Pad();
    padValues.values = this.values;
    padValues.animation = '';
    padValues.input = this.config.campo;
    this.numValue.emit(padValues);
  }

  fecharPad() {
    const padValues = new Pad();
    padValues.values = '';
    padValues.animation = 'out';
    padValues.input = this.config.campo;
    this.fechaPad.emit(padValues);
  }
}
