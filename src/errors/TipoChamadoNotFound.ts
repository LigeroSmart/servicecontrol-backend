export class TipoChamadoNotFound extends Error {
    constructor() {
      super('Tipo de chamado não encontrado.');
      this.name = 'TipoChamadoNotFound';
    }
  }