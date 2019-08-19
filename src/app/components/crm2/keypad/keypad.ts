import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';

export class Pad {
  values: string;
  animation: string;
}

@Component({
  selector: 'keypad',
  templateUrl: './keypad.html',
  styleUrls: ['./keypad.css'],
})
export class KeypadComponent implements OnInit {
  @Output() keyValue: EventEmitter<Pad> = new EventEmitter();
  @Output() fechaPad: EventEmitter<string> = new EventEmitter();
  padVal: Pad;

  public values = '';

  constructor(private bottomSheet: MatBottomSheet, private route: Router) {}

  ngOnInit() { localStorage.clear(); }

  fecharPad() {
    this.fechaPad.emit('out');
  }

  goBack() {
    const padValues = new Pad();
    padValues.values = '';
    padValues.animation = 'out';
    this.route.navigate(['/welcome']);
  }

  addValue(valor: string) {
    this.values += valor;

    const padValues = new Pad();
    padValues.values = this.values;
    padValues.animation = 'in';
    this.keyValue.emit(padValues);
  }

  apagaValor() {
    this.values = this.values.substring(0, this.values.length - 1);
    const padValues = new Pad();
    padValues.values = this.values;
    padValues.animation = 'in';
    this.keyValue.emit(padValues);
  }
}
