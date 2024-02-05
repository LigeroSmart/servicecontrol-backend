export class Contato {
    id: number;
    cliente_id: number;
    codigo: string;
    nome: string;
    telefone: string;
    ramal: string;
    celular: string;
    email: string;
    situacao: string;
  
    constructor(
        id: number,
        cliente_id: number,
        codigo: string,
        nome: string,
        telefone: string,
        ramal: string,
        celular: string,
        email: string,
        situacao: string,
    ) {
      this.id = id;
      this.cliente_id = cliente_id;
      this.codigo = codigo;
      this.nome = nome;
      this.telefone = telefone;
      this.ramal = ramal;
      this.celular = celular;
      this.email = email;
      this.situacao = situacao;
    }
  }