export interface ITipoChamado {
    id?: number;
    descricao: string;
    situacao: string;
  }
  
  export interface CreateTipoChamadoDTO {
    descricao: string;
    situacao: string;
  }
  
  export interface UpdateTipoChamadoDTO {
    descricao: string;
    situacao: string;
  }
  