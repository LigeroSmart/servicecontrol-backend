export class UsuarioAlreadyExists extends Error {
    constructor() {
      super('Usuário já cadastrado.');
      this.name = 'UsuarioAlreadyExists';
    }
  }