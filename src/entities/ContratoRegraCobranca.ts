export class ContratoRegraCobranca {
    id: number;
    contrato_id: number;
    ordem: number;
    nome: string;
    valor: number;
    bloqueado: string;
  
    constructor(
      id: number,
      contrato_id: number,
      ordem: number,
      nome: string,
      valor: number,
      bloqueado: string,
    ) {
      this.id = id;
      this.contrato_id = contrato_id;
      this.ordem = ordem;
      this.nome = nome;
      this.valor = valor;
      this.bloqueado = bloqueado;      
    }
  }