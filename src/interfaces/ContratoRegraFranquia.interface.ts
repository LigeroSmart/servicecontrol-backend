export interface IContratoRegraFranquia {
    id?: number;
    contrato_id: number;
    qtd_horas: number;
    valor_hora: number;
    qtd_meses: number;
    franquia_fixa: string;
  }
  
  export interface CreateContratoRegraFranquiaDTO {
    contrato_id: number;
    qtd_horas: number;
    valor_hora: number;
    qtd_meses: number;
    franquia_fixa: string;
  }
  
  export interface UpdateContratoRegraFranquiaDTO {
    contrato_id: number;
    qtd_horas: number;
    valor_hora: number;
    qtd_meses: number;
    franquia_fixa: string;
  }
  