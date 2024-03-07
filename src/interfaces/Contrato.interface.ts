export interface IContrato {
    id?: number;
    cliente_id: number;
    tipo_contrato_id: number;
    centro_custo_id: number;
    numero: string;
    descricao: string;
    inicio_vigencia: Date;
    termino_vigencia: Date;
    termino_contrato: Date;
    valor_mensal: number;
    situacao: string;
  }
  
  export interface CreateContratoDTO {
    cliente_id: number;
    tipo_contrato_id: number;
    centro_custo_id: number;
    numero: string;
    descricao: string;
    inicio_vigencia: Date;
    termino_vigencia: Date;
    termino_contrato: Date;
    valor_mensal: number;
    situacao: string;
  }
  
  export interface UpdateContratoDTO {
    cliente_id: number;
    tipo_contrato_id: number;
    centro_custo_id: number;
    numero: string;
    descricao: string;
    inicio_vigencia: Date;
    termino_vigencia: Date;
    termino_contrato: Date;
    valor_mensal: number;
    situacao: string;
  }