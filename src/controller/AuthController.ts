import { Request, Response } from 'express';
import { UsuarioInvalidCredentials } from '../errors/UsuarioInvalidCredentials';
import { MakeAuthUseCase } from '../use-cases/factories/MakeAuthUseCase';
import { UsuarioNotActive } from '../errors/UsuarioNotActive';

export class AuthController {
  public authenticate = async (req: Request, res: Response) => {
    const { email, senha } = req.body;

    try {
      const authenticateUseCase = MakeAuthUseCase();

      const authenticateUser = await authenticateUseCase.execute({
        email,
        senha,
      });
  
      return res.status(200).json({
        usuario: {
          id: authenticateUser.user.id,
          nome: authenticateUser.user.nome,
          email: authenticateUser.user.email,
          administrador: authenticateUser.user.administrador,
          situacao: authenticateUser.user.situacao,
        },
        token: authenticateUser.token,
      });
    } catch (error) {
      if (error instanceof UsuarioInvalidCredentials) {
        return res.status(400).json({
          error: error.message,
        });
      } else if (error instanceof UsuarioNotActive) {
        return res.status(400).json({
          error: error.message,
        });
      }
      throw error;
    }
  };
}
