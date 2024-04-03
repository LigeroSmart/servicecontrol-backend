export class RegraCobrancaTipoHorario {
    id: number;
    contrato_cobranca_id: number;
    tipo_horario_id: number;
  
    constructor(
      id: number,
      contrato_cobranca_id: number,
      tipo_horario_id: number
    ) {
      this.id = id;
      this.contrato_cobranca_id = contrato_cobranca_id;
      this.tipo_horario_id = tipo_horario_id;
    }
  }