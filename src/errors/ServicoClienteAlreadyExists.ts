export class ServicoClienteAlreadyExists extends Error {
    constructor() {
      super('Serviço do cliente já cadastrado.');
      this.name = 'ServicoClienteAlreadyExists';
    }
  }