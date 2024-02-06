export class ServicoNotFound extends Error {
    constructor() {
      super('Serviço não encontrado.');
      this.name = 'ServicoNotFound';
    }
  }