export interface IServico {
    id?: number;
    descricao: string;
    situacao?: string;
  }
  
  export interface CreateServicoDTO {
    descricao: string;
    situacao: string;
  }
  
  export interface UpdateServicoDTO {
    descricao: string;
    situacao: string;
  }