export class TipoContatoNotFound extends Error {
    constructor() {
      super('Tipo de contato não encontrado.');
      this.name = 'TipoContatoNotFound';
    }
  }