export class TipoContatoInativo extends Error {
    constructor() {
      super('Tipo de contato inativo.');
      this.name = 'TipoContatoInativo';
    }
  }