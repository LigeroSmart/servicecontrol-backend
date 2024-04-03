export interface IRegraCobrancaTipoHorario {
    id?: number;
    regra_cobranca_id: number;
    tipo_horario_id: number;
  }
  
  export interface CreateRegraCobrancaTipoHorarioDTO {
    regra_cobranca_id: number;
    tipo_horario_id: number;
  }
  
  export interface UpdateRegraCobrancaTipoHorarioDTO {
    regra_cobranca_id: number;
    tipo_horario_id: number;
  }
  