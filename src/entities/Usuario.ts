export class Usuario {
    id: number;
    perfilId: number;
    nome: string;
    email: string;
    senha: string;
    administrador: string;
    situacao: string;
  
    constructor(
      id: number,
      perfilId: number,
      nome: string,
      email: string,
      senha: string,
      administrador: string,
      situacao: string
    ) {
      this.id = id;
      this.perfilId = perfilId
      this.nome = nome;
      this.email = email;
      this.senha = senha;
      this.administrador = administrador;
      this.situacao = situacao;
    }
  }