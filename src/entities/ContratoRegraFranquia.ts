export class ContratoRegraFranquia {
    id: number;
    contrato_id: number;
    qtd_horas: number;
    valor_hora: number;
    qtd_meses: number;
    franquia_fixa: string;
  
    constructor(
      id: number,
      contrato_id: number,
      qtd_horas: number,
      valor_hora: number,
      qtd_meses: number,
      franquia_fixa: string,
    ) {
      this.id = id;
      this.contrato_id = contrato_id;
      this.qtd_horas = qtd_horas;
      this.valor_hora = valor_hora;
      this.qtd_meses = qtd_meses;
      this.franquia_fixa = franquia_fixa;
    }
  }