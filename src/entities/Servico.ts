export class Servico {
    id: number;
    descricao: string;
    situacao: string;
    servico_ligero_id: number;
  
    constructor(
      id: number,
      descricao: string,
      situacao: string,
      servico_ligero_id: number
    ) {
      this.id = id;
      this.descricao = descricao;
      this.situacao = situacao;
      this.servico_ligero_id = servico_ligero_id;
    }
  }