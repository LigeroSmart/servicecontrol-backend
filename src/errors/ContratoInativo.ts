export class ContratoInativo extends Error {
    constructor() {
      super('Contrato inativo.');
      this.name = 'ContratoInativo';
    }
  }