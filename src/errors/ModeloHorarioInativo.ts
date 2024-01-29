export class ModeloHorarioInativo extends Error {
    constructor() {
      super('Modelo de horário inativo.');
      this.name = 'ModeloHorarioInativo';
    }
  }