export class ContratoRegraFranquiaAlreadyExists extends Error {
    constructor() {
      super('Regra de franquia já cadastrada.');
      this.name = 'ContratoRegraFranquiaAlreadyExists';
    }
  }