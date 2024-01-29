export class MenuNotFound extends Error {
    constructor() {
      super('Menu não encontrado.');
      this.name = 'MenuNotFound';
    }
  }