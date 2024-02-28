export interface ITipoContato {
    id?: number;
    descricao: string;
    situacao: string;
  }
  
  export interface CreateTipoContatoDTO {
    descricao: string;
    situacao: string;
  }
  
  export interface UpdateTipoContatoDTO {
    descricao: string;
    situacao: string;
  }