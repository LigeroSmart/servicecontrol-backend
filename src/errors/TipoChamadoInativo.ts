export class TipoChamadoInativo extends Error {
    constructor() {
      super('Tipo de chamado inativo.');
      this.name = 'TipoChamadoInativo';
    }
  }