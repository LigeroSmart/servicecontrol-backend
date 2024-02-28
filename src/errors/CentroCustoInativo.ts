export class CentroCustoInativo extends Error {
    constructor() {
      super('Centro de custo inativo.');
      this.name = 'CentroCustoInativo';
    }
  }