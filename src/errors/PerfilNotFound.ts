export class PerfilNotFound extends Error {
    constructor() {
      super('Perfil não encontrado.');
      this.name = 'PerfilNotFound';
    }
  }