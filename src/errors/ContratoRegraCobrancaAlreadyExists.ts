export class ContratoRegraCobrancaAlreadyExists extends Error {
    constructor() {
      super('Regra de cobrança já cadastrada.');
      this.name = 'ContratoRegraCobrancaAlreadyExists';
    }
  }