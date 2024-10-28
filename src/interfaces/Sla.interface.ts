export interface ISla {
    id?: number;
    descricao: string;
    situacao: string;
    sla_ligero_id: number;
  }
  
  export interface CreateSlaDTO {
    descricao: string;
    situacao: string;
    sla_ligero_id: number;
  }
  
  export interface UpdateSlaDTO {
    descricao: string;
    situacao: string;
    sla_ligero_id: number;
  }