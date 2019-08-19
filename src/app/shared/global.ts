import { Fluxo } from './../models/config';
import { KeyboardClassKey, IKeyboardLayouts } from '@ngx-material-keyboard/core';
export class Global {
    public static CONFIG = './assets/data/config.json';
    public static AGENCIA = 'agencia/getAgencia';
    public static IDENTIFICA_USUARIO = 'identificacao/getUser';
    public static CADASTRA_USUARIO = 'identificacao/insertUser';
    public static UNIDADE_VALIDA = 'identificacao/isUnidadeValida';

    public static GERENTES = 'atendimento/buscaGerentes';
    public static GERENTE_LOGADO = 'atendimento/filasGerenteLogado';
    public static NOVA_SENHA = 'atendimento/novaSenha';
    public static BOTOES = 'utils/buscaBotoes';

    // GLOBAIS PARA NOVA SENHA
    public static IMAGE_BASE_64 = '';
    public static TIPO_ATDO: Fluxo;
    public static NAGENCIA = '';
    public static CONTA = '';

    public static KeyboardCustomLayouts: IKeyboardLayouts = {
      'upperCaseLayout': {
          'name': 'upperCaseLayout',
          'keys': [
            [
                ['Q'], ['W'], ['E'], ['R'], ['T'], ['Y'], ['U'], ['I'], ['O'], ['P'], [KeyboardClassKey.Bksp]
            ],
            [
                ['A'], ['S'], ['D'], ['F'], ['G'], ['H'], ['J'], ['K'], ['L']
            ],
            [
                ['Z'], ['X'], ['C'], ['V'], ['B'], ['N'], ['M']
            ],
            [
                [KeyboardClassKey.Space],
            ]
          ],
          'lang': ['pt-Br']
      },
      'numberLayout': {
          'name': 'numberLayout',
          'keys': [
            [
                ['1'], ['2'], ['3']
            ],
            [
                ['4'], ['5'], ['6']
            ],
            [
                ['7'], ['8'], ['9']
            ],
            [
                ['0'], [KeyboardClassKey.Bksp]
            ]
          ],
          'lang': ['pt-Br']
      }
  };
}
