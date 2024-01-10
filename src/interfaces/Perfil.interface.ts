export interface IPerfil {
    id?: number;
    descricao: string;
    situacao?: string;
  }
  
  export interface CreatePerfilDTO {
    descricao: string;
    situacao: string;
  }
  
  export interface UpdatePerfilDTO {
    descricao: string;
    situacao: string;
  }
  