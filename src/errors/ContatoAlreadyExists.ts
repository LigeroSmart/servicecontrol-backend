export class ContatoAlreadyExists extends Error {
    constructor() {
      super('Contato já cadastrado.');
      this.name = 'ContatoAlreadyExists';
    }
  }