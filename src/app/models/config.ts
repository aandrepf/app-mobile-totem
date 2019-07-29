import { CRM } from "./crm.model";

export interface Config {
  urlServer: string;
  urlCrm: string;
}
// controle para codigo de erro nos cadastros.
export class ResultAction {
  CodAction: number;
  CodRetorno: number;
  MsgRetorno: string;
}

export class Fluxo {
  constructor(
    public tipo: string,
    public isCorrentista: boolean,
    public modalidade: string,
    public crm: CRM,
    public isClienteAgencia: boolean
  ) {}
}
