export interface ISla {
    id?: number;
    descricao: string;
    situacao: string;
  }
  
  export interface CreateSlaDTO {
    descricao: string;
    situacao: string;
  }
  
  export interface UpdateSlaDTO {
    descricao: string;
    situacao: string;
  }