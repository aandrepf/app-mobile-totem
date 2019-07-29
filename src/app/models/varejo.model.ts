export class Botoes {
  idBotaoEmissor: number;
  idBotao: number;
  habilitado: boolean;
  descricao: string;
  categoria: Categoria;
  tamanhoFonte: number;
  prioritario: boolean;
}

export class Categoria {
  id: number;
  tipoCategoria: string;
  nomeCategoria: string;
  senhaInicial: number;
  senhaFinal: number;
  localAtendimento: LocalAtendimento;
  isCliente: boolean;
  metaDia: number;
  minAmarelo: number;
  minVermelho: number;
  contExclusaoAtendimento: number;
}

export class LocalAtendimento {
  idLocalAtendimento: number;
  descricaoLocalAtendimento: string;
}
