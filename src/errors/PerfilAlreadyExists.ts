export class PerfilAlreadyExists extends Error {
    constructor() {
      super('Perfil já cadastrado.');
      this.name = 'PerfilAlreadyExists';
    }
  }