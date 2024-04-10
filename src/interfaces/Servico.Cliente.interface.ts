export interface IServicoCliente {
    id?: number;
    cliente_id: number;
    servico_id: number;
  }
  
  export interface CreateServicoClienteDTO {
    cliente_id: number;
    servico_id: number;
  }
  
  export interface UpdateServicoClienteDTO {
    cliente_id: number;
    servico_id: number;
  }