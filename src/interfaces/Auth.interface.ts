import { Usuario } from '../entities/Usuario';

export interface AuthUseCaseRequest {
  email: string;
  senha: string;
}

export interface AuthUseCaseResponse {
  user: Usuario;
  token: string;
}
