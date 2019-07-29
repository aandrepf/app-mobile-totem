export class BuscaCategoriasDisponiveis {
  categorias: CatGerenciaDisponivel[];
}

export class BuscaGerentesDisponiveis {
  gerentes: any[];
}

export class CatGerenciaDisponivel {
  idBotao: number;
  idCategoria: number;
  nomeCategoria: string;
}

export class InfoGerente {
  email: string;
  emissorCaixa: EmissorCaixa;
  id: number;
  isAtivo: boolean;
  matricula: string;
  nome: string;
  telefone: string;
  tipoUsuarioId: number;
  tipoUsuarioTipo: string;
}

export class EmissorCaixa {
  aliasCaixa: string;
  hostname: string;
  id: number;
  isLogado: boolean;
  politica: any[];
  politicaFormatada: string;
  tipoCaixa: string;
  token: string;
}
