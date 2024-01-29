export class MenuAlreadyExists extends Error {
    constructor() {
      super('Menu já cadastrado.');
      this.name = 'MenuAlreadyExists';
    }
  }