export class TipoChamadoAlreadyExists extends Error {
    constructor() {
      super('Tipo de chamado já cadastrado.');
      this.name = 'TipoChamadoAlreadyExists';
    }
  }