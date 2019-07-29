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

    public static TELA_INTERFACE_RUA = './assets/data/tela_rua.json';
    public static TELA_INTERFACE_SHOP = './assets/data/tela_shop.json';

    // GLOBAIS PARA CRM
    public static CRM_AG = '';
    public static CRM_CNPJ = '';
    public static CRM_CPF = '';
    public static CRM_NAME = '';
    public static CRM_CC = '';
    public static CRM_TIPO = '1';

    // GLOBAIS PARA NOVA SENHA
    public static CODIGO_CATEGORIA: number;
    public static CODIGO_BOTAO: number;
    public static CODIGO_GERENTE: number;
    public static IMAGE_BASE_64 = '';

    public static NOME_CATEGORIA: string;
    public static NOME_GERENTE: string;

    public static TIPO_ATDO: Fluxo;
    public static PAGES: any[] = [];

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
                ['7'], ['8'], ['9']
            ],
            [
                ['4'], ['5'], ['6']
            ],
            [
                ['1'], ['2'], ['3']
            ],
            [
                ['0'], [KeyboardClassKey.Bksp]
            ]
          ],
          'lang': ['pt-Br']
      }
  };
}
