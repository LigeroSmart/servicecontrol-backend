export class Usuario {
    id: number;
    perfil_id: number;
    nome: string;
    email: string;
    senha: string;
    administrador: string;
    situacao: string;
  
    constructor(
      id: number,
      perfil_id: number,
      nome: string,
      email: string,
      senha: string,
      administrador: string,
      situacao: string
    ) {
      this.id = id;
      this.perfil_id = perfil_id
      this.nome = nome;
      this.email = email;
      this.senha = senha;
      this.administrador = administrador;
      this.situacao = situacao;
    }
  }