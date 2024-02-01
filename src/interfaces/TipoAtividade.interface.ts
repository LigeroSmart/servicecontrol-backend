export interface ITipoAtividade {
    id?: number;
    descricao: string;
    situacao: string;
  }
  
  export interface CreateTipoAtividadeDTO {
    descricao: string;
    situacao: string;
  }
  
  export interface UpdateTipoAtividadeDTO {
    descricao: string;
    situacao: string;
  }
  