import { Pipe } from '@angular/core';

@Pipe({
  name: 'limit'
})
export class LimitPipe {
  transform(value: string, args: number) {
    console.log('valor', value);
    console.log('tamanho valor', value.length);
    console.log('args', args);
    console.log('valor formatado', value.substr(0, 4));

    if(value.length <= args) {
      return value.trim();
    } else {
      return value.trim().substring(0, args);
    }
  }
}
