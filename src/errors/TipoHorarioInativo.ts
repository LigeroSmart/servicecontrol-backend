export class TipoHorarioInativo extends Error {
    constructor() {
      super('Tipo de horário inativo.');
      this.name = 'TipoHorarioInativo';
    }
  }