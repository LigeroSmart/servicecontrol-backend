export class UsuarioNotFound extends Error {
    constructor() {
      super('Usuário não encontrado.');
      this.name = 'UsuarioNotFound';
    }
  }