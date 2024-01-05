import { compare } from 'bcryptjs';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AuthUseCaseRequest, AuthUseCaseResponse, } from '../interfaces/Auth.interface';
import { DbUsuarioRepository } from '../repository/DbUsuarioRepository';
import { UsuarioInvalidCredentials } from '../errors/UsuarioInvalidCredentials';
import { UsuarioNotActive } from '../errors/UsuarioNotActive';
import { exit } from 'process';

export class AuthUseCase {
  constructor(private usuarioRepository: DbUsuarioRepository) {}

  async execute({
    email,
    senha,
  }: AuthUseCaseRequest): Promise<AuthUseCaseResponse> {
       
    const user = await this.usuarioRepository.getByUsuario(email);

    if (!user) {
      throw new UsuarioInvalidCredentials();
    }

    //dotenv.config();

    const doesPasswordMatches = await compare(senha, user.senha);

    const token = JWT.sign(
      {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
      process.env.JWT_SECRET || '',
      {
        expiresIn: '1h',
      }
    );

    if (!doesPasswordMatches) {
    //if (senha != user.senha) {
      throw new UsuarioInvalidCredentials();
    }

    if (user.situacao === 'I') {
      throw new UsuarioNotActive();
    }        

    return {
      user,
      token,
    };
  }
}
