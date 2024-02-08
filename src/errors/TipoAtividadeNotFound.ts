export class TipoAtividadeNotFound extends Error {
    constructor() {
      super('Tipo de atividade não encontrado.');
      this.name = 'TipoAtividadeNotFound';
    }
  }