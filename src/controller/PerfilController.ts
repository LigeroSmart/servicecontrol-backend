import { Request, Response } from 'express';
import { PerfilUseCase } from '../use-cases/PerfilUseCase';
import { IPerfil } from '../interfaces/Perfil.interface';
import { PerfilNotFound } from '../errors/PerfilNotFound';
import { PerfilAlreadyExists } from '../errors/PerfilAlreadyExists';

export class PerfilController {
  
  constructor(private perfilUseCase: PerfilUseCase) {
    this.perfilUseCase = perfilUseCase;
  }

  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const { descricao } = req.query;
      let perfil = null;

      if (!descricao) {
        perfil = await this.perfilUseCase.getAll();
      } else {
        perfil = await this.perfilUseCase.getByDescricao(descricao);
      }


      res.status(200).json(perfil);  

    } catch (error: any) {
      if (error instanceof PerfilNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar perfil' });
      }
    }
  };

  public show = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const perfil = await this.perfilUseCase.getById(Number(id));

      res.status(200).json(perfil);
    } catch (error: any) {
      if (error instanceof PerfilNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar perfil' });
      }
    }
  };


  public showPerfil = async (req: Request, res: Response): Promise<void> => {
    try {
      const { perfil_id } = req.query;

      const perfil = await this.perfilUseCase.getByPerfilId(Number(perfil_id));

      res.status(200).json(perfil);
    } catch (error: any) {
      if (error instanceof PerfilNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar perfil' });
      }
    }
  };

  public insert = async (req: Request, res: Response): Promise<void> => {
    try {
      const { descricao, situacao, itens } = req.body;

      // console.log('descricao', descricao, 'situacao', situacao, 'itens', itens);

      const perfil = await this.perfilUseCase.createPerfil(descricao, {
        descricao,
        situacao,
      },
      itens);

      res.status(201).json({ perfil, message: 'Perfil criado com sucesso.' });
    } catch (error: any) {
      if (error instanceof PerfilAlreadyExists) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao criar perfil' });
      }
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const { descricao, situacao, itens } = req.body;

      const perfil = await this.perfilUseCase.update(Number(id), {
        descricao,
        situacao,
      },
      itens);

      res
        .status(200)
        .json({ perfil, message: 'Perfil atualizado com sucesso.' });
    } catch (error: any) {
      if (error instanceof PerfilNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar atualizar o perfil' });
      }
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const perfil = await this.perfilUseCase.delete(Number(id));

      res.status(200).json({ message: 'Perfil apagado.' });

    } catch (error: any) {
      if (error instanceof PerfilNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar apagar perfil' });
      }
    }
  };

}
