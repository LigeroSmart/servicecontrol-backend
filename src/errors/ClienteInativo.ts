export class ClienteInativo extends Error {
    constructor() {
      super('Cliente inativo.');
      this.name = 'ClienteInativo';
    }
  }