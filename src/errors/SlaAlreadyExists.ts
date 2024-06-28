export class SlaAlreadyExists extends Error {
    constructor() {
      super('SLA já cadastrado.');
      this.name = 'SlaAlreadyExists';
    }
  }