export class ServicoAlreadyExists extends Error {
    constructor() {
      super('Serviço já cadastrado.');
      this.name = 'ServicoAlreadyExists';
    }
  }