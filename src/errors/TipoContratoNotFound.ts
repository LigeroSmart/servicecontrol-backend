export class TipoContratoNotFound extends Error {
    constructor() {
      super('Tipo de contrato não encontrado.');
      this.name = 'TipoContratoNotFound';
    }
  }