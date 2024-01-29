export class Menu {
    id: number;
    grupo_id: number;
    descricao: string;
    rota: string;
    ativo: string;
  
    constructor(
      id: number,
      grupo_id: number;
      descricao: string;
      rota: string;
      ativo: string;
    ) {
      this.id = id;
      this.grupo_id = grupo_id;
      this.descricao = descricao;
      this.rota = rota;
      this.ativo = ativo;
    }
  }