export class TipoContatoAlreadyExists extends Error {
    constructor() {
      super('Tipo de contato já cadastrado.');
      this.name = 'TipoContatoAlreadyExists';
    }
  }