export interface IRegraCobrancaTipoChamado {
    id?: number;
    regra_cobranca_id: number;
    tipo_chamado_id: number;
  }
  
  export interface CreateRegraCobrancaTipoChamadoDTO {
    regra_cobranca_id: number;
    tipo_chamado_id: number;
  }
  
  export interface UpdateRegraCobrancaTipoChamadoDTO {
    regra_cobranca_id: number;
    tipo_chamado_id: number;
  }
  