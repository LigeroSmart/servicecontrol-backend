export class UsuarioAlreadyExists extends Error {
    constructor() {
      super('Usuário já existe.');
      this.name = 'UsuarioAlreadyExists';
    }
  }