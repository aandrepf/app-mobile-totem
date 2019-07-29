export class Interface {
  interfaceEmissor: InterfacePagina[];
}
export class InterfacePagina {
  Id: number;
  Descr: string;
  BtnVoltar: boolean;
  InterfaceEmissorBotao: any[];
  InterfaceEmissorLink: InterfaceEmissorLink[];
}
export class InterfaceEmirrorBotao {
  DescLocalAtendimento: string;
  HasImage: boolean;
  IconePrioritario: boolean;
  Id: number;
  IdBotao: number;
  IdEmissorPagina: number;
  IdLocalAtendimento: number;
  Negrito: boolean;
  NomeImage: string;
  PosicaoTexto: number;
  TamanhoBotao: number;
  TextoBotao: string;
  TipoBotao: number;
}
export class InterfaceEmissorLink {
  Id: number;
  Descr: string;
  IdEmissorPagina: number;
  PaginaDestino: number;
  Tipo: string;
  TextoLink: string;
  PosicaoTexto: number;
  TamanhoFonte: number;
  Negrito: boolean;
}
