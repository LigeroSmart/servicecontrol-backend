export interface ICentroCusto {
    id?: number;
    descricao: string;
    situacao: string;
  }
  
  export interface CreateCentroCustoDTO {
    descricao: string;
    situacao: string;
  }
  
  export interface UpdateCentroCustoDTO {
    descricao: string;
    situacao: string;
  }