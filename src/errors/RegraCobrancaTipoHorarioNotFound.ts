export class RegraCobrancaTipoHorarioNotFound extends Error {
    constructor() {
      super('Tipod ehorário da regra de cobrança não encontrada.');
      this.name = 'RegraCobrancaTipoHorarioNotFound';
    }
  }