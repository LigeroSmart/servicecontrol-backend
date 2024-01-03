export class Usuario {
    id: number;
    perfilId: number;
    nome: string;
    usuario: string;
    senha: string;
    administrador: string;
    situacao: string;
  
    constructor(
      id: number,
      perfilId: number,
      nome: string,
      usuario: string,
      senha: string,
      administrador: string,
      situacao: string
    ) {
      this.id = id;
      this.perfilId = perfilId
      this.nome = nome;
      this.usuario = usuario;
      this.senha = senha;
      this.administrador = administrador;
      this.situacao = situacao;
    }
  }