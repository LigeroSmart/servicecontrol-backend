export class ModeloHorario {
    id: number;
    descricao: string;
    tipo_horario_id: number;
    inicio: Date;
    termino: Date;
    situacao: string;
  
    constructor(
      id: number,
      descricao: string,
      tipo_horario_id: number,
      inicio: Date,
      termino: Date,
      situacao: string,
    ) {
      this.id = id;
      this.descricao = descricao;
      this.tipo_horario_id = tipo_horario_id;
      this.inicio = inicio;
      this.termino = termino;
      this.situacao = situacao;
    }
  }