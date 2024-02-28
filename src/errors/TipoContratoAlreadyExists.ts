export class TipoContratoAlreadyExists extends Error {
    constructor() {
      super('Tipo de contrato já cadastrado.');
      this.name = 'TipoContratoAlreadyExists';
    }
  }