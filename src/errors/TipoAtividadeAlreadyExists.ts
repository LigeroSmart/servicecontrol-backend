export class TipoAtividadeAlreadyExists extends Error {
    constructor() {
      super('Tipo de atividade já cadastrado.');
      this.name = 'TipoAtividadeAlreadyExists';
    }
  }