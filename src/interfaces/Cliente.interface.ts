export interface ICliente {
    id?: number;
    modelo_horario_id: number;
    cliente_ligero_id: number;
    codigo: number;
    cnpj: string;
    ie: string;
    abreviacao: string;
    nome_fantasia: string;
    razao_social: string;
    cep: string;
    endereco: string;
    bairro: string;
    cidade: string;
    uf: string;
    site: string;
    observacao: string;
    situacao: string;    
  }
  
  export interface CreateClienteDTO {
    modelo_horario_id: number;
    cliente_ligero_id: number;
    codigo: number;
    cnpj: string;
    ie: string;
    abreviacao: string;
    nome_fantasia: string;
    razao_social: string;
    cep: string;
    endereco: string;
    bairro: string;
    cidade: string;
    uf: string;
    site: string;
    observacao: string;
    situacao: string;
  }
  
  export interface UpdateClienteDTO {
    modelo_horario_id: number;
    cliente_ligero_id: number;
    codigo: number;
    cnpj: string;
    ie: string;
    abreviacao: string;
    nome_fantasia: string;
    razao_social: string;
    cep: string;
    endereco: string;
    bairro: string;
    cidade: string;
    uf: string;
    site: string;
    observacao: string;
    situacao: string;
  }