export class ModeloHorarioNotFound extends Error {
    constructor() {
      super('Modelo de horário não encontrado.');
      this.name = 'ModeloHorarioNotFound';
    }
  }