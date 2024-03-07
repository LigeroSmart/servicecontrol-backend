export class CNPJInvalid extends Error {
    constructor() {
      super('CNPJ inválido.');
      this.name = 'CNPJInvalid';
    }
  }