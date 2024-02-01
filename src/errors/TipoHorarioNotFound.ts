export class TipoHorarioNotFound extends Error {
    constructor() {
      super('Tipo  de horário não encontrado.');
      this.name = 'TipoHorarioNotFound';
    }
  }