import { Request, Response } from 'express';
import { UsuarioUseCase } from '../use-cases/UsuarioUseCase';
import { IUsuario } from '../interfaces/Usuario.Interface';
import { UsuarioNotFound } from '../errors/UsuarioNotFound';
import { UsuarioAlreadyExists } from '../errors/UsuarioAlreadyExists';
// import { sendEmail } from '../middlewares/sendEmail';

export class UsuarioController {
  
  constructor(private usuarioUseCase: UsuarioUseCase) {
    this.usuarioUseCase = usuarioUseCase;
  }

  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nome } = req.query;
      let users = null;

      if (!nome) {
        users = await this.usuarioUseCase.getAll();
      } else {
        users = await this.usuarioUseCase.getByNome(nome);
      }

      // const users = await this.usuarioUseCase.getAll();
      res.status(200).json(users);

    } catch (error: any) {
      if (error instanceof UsuarioNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar usuários' });
      }
    }
  };

  public show = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const user = await this.usuarioUseCase.getById(Number(id));

      res.status(200).json(user);
    } catch (error: any) {
      if (error instanceof UsuarioNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar usuário' });
      }
    }
  };

  public insert = async (req: Request, res: Response): Promise<void> => {
    try {
      const { perfil_id, nome, email, administrador, situacao } = req.body;

      const senha = '';

      const user = await this.usuarioUseCase.createUsuario(email, {
        perfil_id,
        nome,
        email,
        senha,
        administrador,
        situacao,
      });

      res.status(201).json({ user, message: 'Usuário criado com sucesso.' });
    } catch (error: any) {
      if (error instanceof UsuarioAlreadyExists) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao criar usuário' });
      }
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const { perfil_id, nome, situacao, administrador } = req.body;

      const user = await this.usuarioUseCase.update(Number(id), {
        perfil_id,
        nome,
        administrador,
      });

      res
        .status(200)
        .json({ user, message: 'Usuário atualizado com sucesso.' });
    } catch (error: any) {
      if (error instanceof UsuarioNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar atualizar o usuário' });
      }
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const user = await this.usuarioUseCase.delete(Number(id));

      res.status(200).json({ message: 'Usuário apagado.' });

    } catch (error: any) {
      if (error instanceof UsuarioNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar deleta usuário' });
      }
    }
  };

  public validationUser = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const { senha } = req.body;

      const user = await this.usuarioUseCase.validationUsuario(Number(id), senha);

      res.status(200).json({ message: 'Usuário ativado com sucesso.' });
    } catch (error: any) {
      if (error instanceof UsuarioNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar validar um usuário' });
      }
    }
  };

  public updatePassword = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const { senha } = req.body;

      const user = await this.usuarioUseCase.updatePassword(Number(id), senha);

      res.status(200).json({ user, message: 'Senha atualizada com sucesso.' });
    } catch (error: any) {
      if (error instanceof UsuarioNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar atualizar a senha' });
      }
    }
  };
}
