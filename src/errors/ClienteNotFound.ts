export class ClienteNotFound extends Error {
    constructor() {
      super('Cliente não encontrado.');
      this.name = 'ClienteNotFound';
    }
  }