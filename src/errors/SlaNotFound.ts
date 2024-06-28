export class SlaNotFound extends Error {
    constructor() {
      super('SLA não encontrado.');
      this.name = 'SlaNotFound';
    }
  }