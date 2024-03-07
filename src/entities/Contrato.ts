export class Contrato {
    id: number;
    cliente_id: number;
    tipo_contrato_id: number;
    centro_custo_id: number;
    numero: string;
    descricao: string;
    inicio_vigencia: Date;
    termino_vigencia: Date;
    termino_contrato: Date;
    valor_mensal: number;
    situacao: string;
  
    constructor(
        id: number,
        cliente_id: number,
        tipo_contrato_id: number,
        centro_custo_id: number,
        numero: string,
        descricao: string,
        inicio_vigencia: Date,
        termino_vigencia: Date,
        termino_contrato: Date,
        valor_mensal: number,
        situacao: string,
    ) {
      this.id = id;
      this.cliente_id = cliente_id;
      this.tipo_contrato_id = tipo_contrato_id;
      this.centro_custo_id = centro_custo_id;
      this.numero = numero;
      this.descricao = descricao;
      this.inicio_vigencia = inicio_vigencia;
      this.termino_vigencia = termino_vigencia;
      this.termino_contrato = termino_contrato;
      this.valor_mensal = valor_mensal;
      this.situacao = situacao;
    }
  }