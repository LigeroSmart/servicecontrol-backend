export class ClienteAlreadyExists extends Error {
    constructor() {
      super('Cliente já cadastrado.');
      this.name = 'ClienteAlreadyExists';
    }
  }