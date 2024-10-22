export interface IServico {
    id?: number;
    descricao: string;
    situacao?: string;
    servico_ligero_id: number;
  }
  
  export interface CreateServicoDTO {
    descricao: string;
    situacao: string;
    servico_ligero_id: number;
  }
  
  export interface UpdateServicoDTO {
    descricao: string;
    situacao: string;
    servico_ligero_id: number;
  }