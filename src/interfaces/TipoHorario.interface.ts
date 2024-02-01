export interface ITipoHorario {
    id?: number;
    descricao: string;
    situacao: string;
  }
  
  export interface CreateTipoHorarioDTO {
    descricao: string;
    situacao: string;
  }
  
  export interface UpdateTipoHorarioDTO {
    descricao: string;
    situacao: string;
  }
  