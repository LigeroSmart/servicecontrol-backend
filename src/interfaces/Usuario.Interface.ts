export interface IUsuario {
    id?: number;
    perfilId: number,
    nome: string;
    usuario: string
    senha?: string;
    administrador?: string;
    situacao?: string;
  }
  
  export interface CreateUsuarioDTO {
    perfilId: number,
    nome: string;
    usuario: string,
    senha: string;
    administrador: string;
    situacao: string;
  }
  
  export interface UpdateUsuarioDTO {
    perfilId: number,
    nome: string;
    usuario: string;
    senha: string,
    administrador: string;
    situacao: string;
  }
  