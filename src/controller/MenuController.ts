import { Request, Response } from 'express';
import { MenuUseCase } from '../use-cases/MenuUseCase';
import { IMenu } from '../interfaces/Menu.interface';
import { MenuNotFound } from '../errors/MenuNotFound';
import { MenuAlreadyExists } from '../errors/MenuAlreadyExists';

export class MenuController {
  
  constructor(private menuUseCase: MenuUseCase) {
    this.menuUseCase = menuUseCase;
  }

  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const menu = await this.menuUseCase.getAll();
      res.status(200).json(menu);

    } catch (error: any) {
      if (error instanceof MenuNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar menu' });
      }
    }
  };

  public show = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const menu = await this.menuUseCase.getById(Number(id));

      res.status(200).json(menu);
    } catch (error: any) {
      if (error instanceof MenuNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar menu' });
      }
    }
  };

  public insert = async (req: Request, res: Response): Promise<void> => {
    try {
      const { grupo_id, descricao, rota, ativo } = req.body;

      const menu = await this.menuUseCase.createMenu(descricao, {
        grupo_id,
        descricao,
        rota,
        ativo,
      });

      res.status(201).json({ menu, message: 'Menu criado com sucesso.' });
    } catch (error: any) {
      if (error instanceof MenuAlreadyExists) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao criar menu' });
      }
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const { grupo_id, descricao, rota, ativo } = req.body;

      const menu = await this.menuUseCase.update(Number(id), {
        grupo_id,
        descricao,
        rota,
        ativo,
      });

      res
        .status(200)
        .json({ menu, message: 'Menu atualizado com sucesso.' });
    } catch (error: any) {
      if (error instanceof MenuNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar atualizar o menu' });
      }
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const menu = await this.menuUseCase.delete(Number(id));

      res.status(200).json({ message: 'Menu apagado.' });

    } catch (error: any) {
      if (error instanceof MenuNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar apagar menu' });
      }
    }
  };

}
