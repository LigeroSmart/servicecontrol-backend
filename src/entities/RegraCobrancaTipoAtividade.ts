export class RegraCobrancaTipoAtividade {
    id: number;
    contrato_cobranca_id: number;
    tipo_atividade_id: number;
  
    constructor(
      id: number,
      contrato_cobranca_id: number,
      tipo_atividade_id: number
    ) {
      this.id = id;
      this.contrato_cobranca_id = contrato_cobranca_id;
      this.tipo_atividade_id = tipo_atividade_id;
    }
  }