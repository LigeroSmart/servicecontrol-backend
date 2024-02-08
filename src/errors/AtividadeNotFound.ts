export class AtividadeNotFound extends Error {
    constructor() {
      super('Atividade não encontrada.');
      this.name = 'AtividadeNotFound';
    }
  }