export class Sla {
    id: number;
    descricao: string;
    situacao: string;
    sla_ligero_id: number;
  
    constructor(
      id: number,
      descricao: string,
      situacao: string,
      sla_ligero_id: number
    ) {
      this.id = id;
      this.descricao = descricao;
      this.situacao = situacao;
      this.sla_ligero_id = sla_ligero_id;
    }
  }