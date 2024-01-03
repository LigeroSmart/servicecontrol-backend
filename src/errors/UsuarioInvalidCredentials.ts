export class UsuarioInvalidCredentials extends Error {
    constructor() {
      super('Credenciais Invalidas.');
      this.name = 'UsuarioInvalidCredentials';
    }
  }
  