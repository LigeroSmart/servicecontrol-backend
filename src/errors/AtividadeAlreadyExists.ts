export class AtividadeAlreadyExists extends Error {
    constructor() {
      super('Atividade já cadastrada.');
      this.name = 'AtividadeAlreadyExists';
    }
  }