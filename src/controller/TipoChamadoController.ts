import { Request, Response } from 'express';
import { TipoChamadoUseCase } from '../use-cases/TipoChamadoUseCase';
import { ITipoChamado } from '../interfaces/TipoChamado.interface';
import { TipoChamadoNotFound } from '../errors/TipoChamadoNotFound';
import { TipoChamadoAlreadyExists } from '../errors/TipoChamadoAlreadyExists';

export class TipoChamadoController {
  
  constructor(private TipoChamadoUseCase: TipoChamadoUseCase) {
    this.TipoChamadoUseCase = TipoChamadoUseCase;
  }

  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const TipoChamado = await this.TipoChamadoUseCase.getAll();
      res.status(200).json(TipoChamado);

    } catch (error: any) {
      if (error instanceof TipoChamadoNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar tipo de chamado' });
      }
    }
  };

  public show = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const TipoChamado = await this.TipoChamadoUseCase.getById(Number(id));

      res.status(200).json(TipoChamado);
    } catch (error: any) {
      if (error instanceof TipoChamadoNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar tipo de chamado' });
      }
    }
  };

  public insert = async (req: Request, res: Response): Promise<void> => {
    try {
      const { descricao, situacao } = req.body;

      const TipoChamado = await this.TipoChamadoUseCase.createTipoChamado(descricao, {
        descricao,
        situacao,
      });

      res.status(201).json({ TipoChamado, message: 'Tipo de chamado criado com sucesso.' });
    } catch (error: any) {
      if (error instanceof TipoChamadoAlreadyExists) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao criar tipo de chamado' });
      }
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const { descricao, situacao } = req.body;

      const TipoChamado = await this.TipoChamadoUseCase.update(Number(id), {
        descricao,
        situacao,
      });

      res
        .status(200)
        .json({ TipoChamado, message: 'Tipo de chamado atualizado com sucesso.' });
    } catch (error: any) {
      if (error instanceof TipoChamadoNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar atualizar o tipo de chamado' });
      }
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const TipoChamado = await this.TipoChamadoUseCase.delete(Number(id));

      res.status(200).json({ message: 'Tipo de chamado apagado.' });

    } catch (error: any) {
      if (error instanceof TipoChamadoNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar apagar tipo de chamado' });
      }
    }
  };

}
