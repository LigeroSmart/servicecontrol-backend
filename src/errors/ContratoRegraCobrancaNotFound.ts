export class ContratoRegraCobrancaNotFound extends Error {
    constructor() {
      super('Regra de cobrança não encontrada.');
      this.name = 'ContratoRegraCobrancaNotFound';
    }
  }