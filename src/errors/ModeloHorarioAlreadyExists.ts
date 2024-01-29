export class ModeloHorarioAlreadyExists extends Error {
    constructor() {
      super('Modelo de horário já cadastrado.');
      this.name = 'ModeloHorarioAlreadyExists';
    }
  }