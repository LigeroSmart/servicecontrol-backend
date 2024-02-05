export class ContatoInativo extends Error {
    constructor() {
      super('Contato inativo.');
      this.name = 'ContatoInativo';
    }
  }