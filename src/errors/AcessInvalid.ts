export class AcessInvalid extends Error {
    constructor() {
      super('Acesso negado');
      this.name = 'AcessInvalid';
    }
  }
  