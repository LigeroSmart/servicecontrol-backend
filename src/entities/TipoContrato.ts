export class TipoContrato {
    id: number;
    descricao: string;
    cobranca_unica: string;
    situacao: string;
  
    constructor(
      id: number,
      descricao: string;
      cobranca_unica: string;
      situacao: string;
    ) {
      this.id = id;
      this.descricao = descricao;
      this.cobranca_unica = cobranca_unica;
      this.situacao = situacao;
    }
  }