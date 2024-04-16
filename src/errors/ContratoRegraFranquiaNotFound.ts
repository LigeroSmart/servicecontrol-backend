export class ContratoRegraFranquiaNotFound extends Error {
    constructor() {
      super('Regra de franquia não encontrada.');
      this.name = 'ContratoRegraFranquiaNotFound';
    }
  }