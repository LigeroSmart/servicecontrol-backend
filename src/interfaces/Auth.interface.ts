import { Usuario } from '../entities/Usuario';

export interface AuthUseCaseRequest {
  usuario: string;
  senha: string;
}

export interface AuthUseCaseResponse {
  user: Usuario;
  token: string;
}
