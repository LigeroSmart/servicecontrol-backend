export interface IUsuario {
    id?: number;
    perfilId: number,
    nome: string;
    email: string
    senha?: string;
    administrador?: string;
    situacao?: string;
  }
  
  export interface CreateUsuarioDTO {
    perfil_id: number,
    nome: string;
    email: string,
    senha: string;
    administrador: string;
    situacao: string;
  }
  
  export interface UpdateUsuarioDTO {
    perfil_id: number,
    nome: string;
    administrador: string;
  }
  