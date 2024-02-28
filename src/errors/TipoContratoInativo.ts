export class TipoContratoInativo extends Error {
    constructor() {
      super('Tipo de contrato inativo.');
      this.name = 'TipoContratoInativo';
    }
  }