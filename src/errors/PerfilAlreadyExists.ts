export class PerfilAlreadyExists extends Error {
    constructor() {
      super('Perfil já existe.');
      this.name = 'PerfilAlreadyExists';
    }
  }