export class MenuAlreadyExists extends Error {
    constructor() {
      super('Menu já existe.');
      this.name = 'MenuAlreadyExists';
    }
  }