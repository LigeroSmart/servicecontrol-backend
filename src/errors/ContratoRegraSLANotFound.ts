export class ContratoRegraSlaNotFound extends Error {
    constructor() {
      super('Regra de SLA não encontrada.');
      this.name = 'ContratoRegraSlaNotFound';
    }
  }