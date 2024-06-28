export class SlaInativo extends Error {
    constructor() {
      super('SLA inativo.');
      this.name = 'SlaInativo';
    }
  }