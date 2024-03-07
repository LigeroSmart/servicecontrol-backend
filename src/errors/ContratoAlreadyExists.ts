export class ContratoAlreadyExists extends Error {
    constructor() {
      super('Contrato já cadastrado.');
      this.name = 'ContratoAlreadyExists';
    }
  }