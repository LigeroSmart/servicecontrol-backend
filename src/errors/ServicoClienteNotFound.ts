export class ServicoClienteNotFound extends Error {
    constructor() {
      super('Serviço do cliente não encontrado.');
      this.name = 'ServicoClienteNotFound';
    }
  }