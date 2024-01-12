export interface IMenu {
    id?: number;
    grupo_id: number;
    descricao: string;
    rota: string;
    ativo: string;
  }
  
  export interface CreateMenuDTO {
    grupo_id: number;
    descricao: string;
    rota: string;
    ativo: string;
  }
  
  export interface UpdateMenuDTO {
    grupo_id: number;
    descricao: string;
    rota: string;
    ativo: string;
  }
  