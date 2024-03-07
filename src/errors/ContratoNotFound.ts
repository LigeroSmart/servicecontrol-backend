export class ContratoNotFound extends Error {
    constructor() {
      super('Contrato não encontrado.');
      this.name = 'ContratoNotFound';
    }
  }