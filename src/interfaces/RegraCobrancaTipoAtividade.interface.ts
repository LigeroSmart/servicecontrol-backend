export interface IRegraCobrancaTipoAtividade {
    id?: number;
    regra_cobranca_id: number;
    tipo_atividade_id: number;
  }
  
  export interface CreateRegraCobrancaTipoAtividadeDTO {
    regra_cobranca_id: number;
    tipo_atividade_id: number;
  }
  
  export interface UpdateRegraCobrancaTipoAtividadeDTO {
    regra_cobranca_id: number;
    tipo_atividade_id: number;
  }
  