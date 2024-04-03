export class RegraCobrancaTipoChamado {
    id: number;
    contrato_cobranca_id: number;
    tipo_chamado_id: number;
  
    constructor(
      id: number,
      contrato_cobranca_id: number,
      tipo_chamado_id: number
    ) {
      this.id = id;
      this.contrato_cobranca_id = contrato_cobranca_id;
      this.tipo_chamado_id = tipo_chamado_id;
    }
  }