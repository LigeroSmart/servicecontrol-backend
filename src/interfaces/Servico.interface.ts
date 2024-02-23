export interface IServico {
    id?: number;
    codigo: string;
    descricao: string;
    situacao?: string;
  }
  
  export interface CreateServicoDTO {
    codigo: string;
    descricao: string;
    situacao: string;
  }
  
  export interface UpdateServicoDTO {
    codigo: string;
    descricao: string;
    situacao: string;
  }