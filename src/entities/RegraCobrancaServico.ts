export class RegraCobrancaServico {
    id: number;
    contrato_cobranca_id: number;
    servico_cliente_id: number;
  
    constructor(
      id: number,
      contrato_cobranca_id: number,
      servico_cliente_id: number
    ) {
      this.id = id;
      this.contrato_cobranca_id = contrato_cobranca_id;
      this.servico_cliente_id = servico_cliente_id;
    }
  }