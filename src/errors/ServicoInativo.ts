export class ServicoInativo extends Error {
    constructor() {
      super('Serviço inativo.');
      this.name = 'ServicoInativo';
    }
  }