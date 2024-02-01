export class TipoHorarioAlreadyExists extends Error {
    constructor() {
      super('Tipo de horário já cadastrado.');
      this.name = 'TipoHorarioAlreadyExists';
    }
  }