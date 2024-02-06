export class ServicoCliente {
    id: number;
    cliente_id: number;
    servico_id: number;
  
    constructor(
      id: number,
      cliente_id: number,
      servico_id: number
    ) {
      this.id = id;
      this.cliente_id = cliente_id;
      this.servico_id = servico_id;
    }
  }