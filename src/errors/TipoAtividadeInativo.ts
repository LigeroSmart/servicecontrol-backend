export class TipoAtividadeInativo extends Error {
    constructor() {
      super('Tipo de atividade inativo.');
      this.name = 'TipoAtividadeInativo';
    }
  }