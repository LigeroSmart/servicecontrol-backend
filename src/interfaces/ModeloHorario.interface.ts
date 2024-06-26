export interface IModeloHorario {
    id?: number;
    descricao: string;
    tipo_horario_id: number;
    inicio: Date;
    termino: Date;
    situacao: string;
  }
  
  export interface CreateModeloHorarioDTO {
    descricao: string;
    tipo_horario_id: number;
    inicio: Date;
    termino: Date;
    situacao: string;
  }
  
  export interface UpdateModeloHorarioDTO {
    descricao: string;
    tipo_horario_id: number;
    inicio: Date;
    termino: Date;
    situacao: string;
  }
  