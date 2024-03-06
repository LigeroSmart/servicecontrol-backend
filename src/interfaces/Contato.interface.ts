export interface IContato {
    id?: number;
    cliente_id: number;
    nome: string;
    telefone: string;
    ramal: string;
    celular: string;
    email: string;
    situacao: string;
  }
  
  export interface CreateContatoDTO {
    cliente_id: number;
    nome: string;
    telefone: string;
    ramal: string;
    celular: string;
    email: string;
    situacao: string;
  }
  
  export interface UpdateContatoDTO {
    cliente_id: number;
    nome: string;
    telefone: string;
    ramal: string;
    celular: string;
    email: string;
    situacao: string;
  }