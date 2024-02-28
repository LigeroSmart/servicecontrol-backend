export interface ITipoContrato {
    id?: number;
    descricao: string;
    cobranca_unica: string;
    situacao: string;
  }
  
  export interface CreateTipoContratoDTO {
    descricao: string;
    cobranca_unica: string;
    situacao: string;
  }
  
  export interface UpdateTipoContratoDTO {
    descricao: string;
    cobranca_unica: string;
    situacao: string;
  }