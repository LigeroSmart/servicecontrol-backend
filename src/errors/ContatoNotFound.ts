export class ContatoNotFound extends Error {
    constructor() {
      super('Contato não encontrado.');
      this.name = 'ContatoNotFound';
    }
  }