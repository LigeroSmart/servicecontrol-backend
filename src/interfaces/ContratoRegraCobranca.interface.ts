export interface IContratoRegraCobranca {
    id?: number;
    contrato_id: number;
    ordem: number;
    nome: string;
    valor: number;
    bloqueado: string;
  }
  
  export interface CreateContratoRegraCobrancaDTO {
    contrato_id: number;
    ordem: number;
    nome: string;
    valor: number;
    bloqueado: string;
  }
  
  export interface UpdateContratoRegraCobrancaDTO {
    contrato_id: number;
    ordem: number;
    nome: string;
    valor: number;
    bloqueado: string;
  }
  