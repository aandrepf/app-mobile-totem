import { CrmComponent } from './../components/crm/crm.component';
import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { Global } from '../shared/global';

@Injectable()
export class VkbmaskService {
    constructor() {}

    formatToAgencia(val: string) {
      if(val !== null) {
        let ret = val.replace(/(\d{4})\d+?$/, '$1');
        let pad = '0000';
        let ans = pad.substring(0, pad.length - ret.length) + ret;
        console.log('VALOR AGENCIA EDITADO', ans);
        this.getAGFormatada(ans);
        return ret;
      }
    }

    getAGFormatada(valor: string) {
      return valor;
    }

    formatToConta(val: string) {
      if (val !== null) {
        let ret = val.replace(/(\d{7})\d+?$/, '$1');
        let pad = '0000000';
        let ans = pad.substring(0, pad.length - ret.length) + ret;

        return ret;
      }
    }

    formatToName(val: string): string {
        let ret = val;
        if (ret.length > 35) {
            ret = ret.slice(0, 35);
        }
        return ret;
    }

    formatToComment(val: string): string {
        let ret = val;
        if (ret.length > 80) {
            ret = ret.slice(0, 80);
        }
        console.log(ret.length);
        return ret;
    }

    formatToMatricula(val: string): string {
        let ret = val;
        if (ret.length > 20) {
            ret = ret.slice(0, 20);
        }
        return ret;
    }


    formatToCpf(val: string): string {
        let ret = '';
        for (let i = 0; i < val.length; i++) {
            if (i === 3 || i === 7) {
                if (val.charAt(i) !== '.') {
                    ret += '.' + val.charAt(val.length - 1);
                } else {
                    ret += '.';
                }
            } else if (i === 11) {
                if (val.charAt(i) !== '-') {
                    ret += '-' + val.charAt(val.length - 1);
                } else {
                    ret += '-';
                }
            } else {
                ret += val.charAt(i);
            }
        }
        if (ret.length > 14) {
            ret = ret.slice(0, 14);
        }
        return ret;
    }

    formatToCnpj(val: string): string {
        let ret = '';
        for (let i = 0; i < val.length; i++) {
            if (i === 2 || i === 6) {
                if (val.charAt(i) !== '.') {
                    ret += '.' + val.charAt(val.length - 1);
                } else {
                    ret += '.';
                }
            } else  if (i === 10) {
                if (val.charAt(i) !== '/') {
                    ret += '/' + val.charAt(val.length - 1);
                } else {
                    ret += '/';
                }
            } else  if (i === 15) {
                if (val.charAt(i) !== '-') {
                    ret += '-' + val.charAt(val.length - 1);
                } else {
                    ret += '-';
                }
            } else {
                ret += val.charAt(i);
            }
        }
        if (ret.length > 18) {
            ret = ret.slice(0, 18);
        }
        return ret;
    }

    formatToPhone(val: string): string {
        let ret = '';
        for (let i = 0; i < val.length; i++) {
            if (i === 2) {
                if (val.charAt(i) !== ' ') {
                    ret += ' ' + val.charAt(val.length - 1);
                } else {
                    ret += ' ';
                }
            } else  if (i === 7) {
                if (val.charAt(i) !== '-') {
                    ret += '-' + val.charAt(val.length - 1);
                } else {
                    ret += '-';
                }
            } else {
                ret += val.charAt(i);
            }
        }
        if (ret.length > 12) {
            ret = ret.slice(0, 12);
        }
        return ret;
    }

    formatToCel(val: string): string {
        let ret = '';
        for (let i = 0; i < val.length; i++) {
            if (i === 2) {
                if (val.charAt(i) !== ' ') {
                    ret += ' ' + val.charAt(val.length - 1);
                } else {
                    ret += ' ';
                }
            } else  if (i === 8) {
                if (val.charAt(i) !== '-') {
                    ret += '-' + val.charAt(val.length - 1);
                } else {
                    ret += '-';
                }
            } else {
                ret += val.charAt(i);
            }
        }
        if (ret.length > 13) {
            ret = ret.slice(0, 13);
        }
        return ret;
    }

    formatToAgcc(val: string): string {
        let ret = '';
        for (let i = 0; i < val.length; i++) {
            if (i === 4) {
                if (val.charAt(i) !== '-') {
                    ret += '-' + val.charAt(val.length - 1);
                } else {
                    ret += '-';
                }
            } else {
                ret += val.charAt(i);
            }
        }
        return ret;
    }

}
