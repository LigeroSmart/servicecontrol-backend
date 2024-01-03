export class UsuarioNotActive extends Error {
    constructor() {
      super('Usuário não foi validado.');
      this.name = 'UsuarioNotActive';
    }
  }
  