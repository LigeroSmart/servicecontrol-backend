export interface IModeloHorario {
    id?: number;
    descricao: string;
    situacao: string;
  }
  
  export interface CreateModeloHorarioDTO {
    descricao: string;
    situacao: string;
  }
  
  export interface UpdateModeloHorarioDTO {
    descricao: string;
    situacao: string;
  }
  