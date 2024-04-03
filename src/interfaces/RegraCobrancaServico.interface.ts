export interface IRegraCobrancaServico {
    id?: number;
    regra_cobranca_id: number;
    servico_cliente_id: number;
  }
  
  export interface CreateRegraCobrancaServicoDTO {
    regra_cobranca_id: number;
    servico_cliente_id: number;
  }
  
  export interface UpdateRegraCobrancaServicoDTO {
    regra_cobranca_id: number;
    servico_cliente_id: number;
  }
  