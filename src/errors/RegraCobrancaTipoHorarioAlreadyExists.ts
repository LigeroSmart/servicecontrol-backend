export class RegraCobrancaTipoHorarioAlreadyExists extends Error {
    constructor() {
      super('Tipo de horário da regra de cobrança já cadastrada.');
      this.name = 'RegraCobrancaTipoHorarioAlreadyExists';
    }
  }