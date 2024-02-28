export class CentroCustoNotFound extends Error {
    constructor() {
      super('Centro de custo não encontrado.');
      this.name = 'CentroCustoNotFound';
    }
  }