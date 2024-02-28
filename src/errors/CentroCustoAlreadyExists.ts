export class CentroCustoAlreadyExists extends Error {
    constructor() {
      super('Centro de custo já cadastrad.');
      this.name = 'CentroCustoAlreadyExists';
    }
  }