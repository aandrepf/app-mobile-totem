export class NovaSenha {
  crm: CRM;
  categoriaId: number;
  btnId: number;
  idUsuarioEscolhido: number;
  basePic: string;
}

export class VerificaUsuario {
  dados: any;
  isAgencia: boolean;
}

export class CRM {
  ag: string;
  cnpj: string;
  cpf: string;
  nome_cliente: string;
  nome: string;
  cc: string;
  tipo_identificacao: number;
  idIdentificacaoCrm: number;
  idCategoria: number;
  idGerente: number;
  prioritario: boolean;
  documento: string;
}
