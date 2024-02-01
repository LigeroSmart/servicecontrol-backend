import { Request, Response } from 'express';
import { TipoHorarioUseCase } from '../use-cases/TipoHorarioUseCase';
import { ITipoHorario } from '../interfaces/TipoHorario.interface';
import { TipoHorarioNotFound } from '../errors/TipoHorarioNotFound';
import { TipoHorarioAlreadyExists } from '../errors/TipoHorarioAlreadyExists';

export class TipoHorarioController {
  
  constructor(private TipoHorarioUseCase: TipoHorarioUseCase) {
    this.TipoHorarioUseCase = TipoHorarioUseCase;
  }

  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const TipoHorario = await this.TipoHorarioUseCase.getAll();
      res.status(200).json(TipoHorario);

    } catch (error: any) {
      if (error instanceof TipoHorarioNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar tipo de horario' });
      }
    }
  };

  public show = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const TipoHorario = await this.TipoHorarioUseCase.getById(Number(id));

      res.status(200).json(TipoHorario);
    } catch (error: any) {
      if (error instanceof TipoHorarioNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar tipo de horario' });
      }
    }
  };

  public insert = async (req: Request, res: Response): Promise<void> => {
    try {
      const { descricao, situacao } = req.body;

      const TipoHorario = await this.TipoHorarioUseCase.createTipoHorario(descricao, {
        descricao,
        situacao,
      });

      res.status(201).json({ TipoHorario, message: 'Tipo de horario criado com sucesso.' });
    } catch (error: any) {
      if (error instanceof TipoHorarioAlreadyExists) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao criar tipo de horario' });
      }
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const { descricao, situacao } = req.body;

      const TipoHorario = await this.TipoHorarioUseCase.update(Number(id), {
        descricao,
        situacao,
      });

      res
        .status(200)
        .json({ TipoHorario, message: 'Tipo de horario atualizado com sucesso.' });
    } catch (error: any) {
      if (error instanceof TipoHorarioNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar atualizar o tipo de horario' });
      }
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const TipoHorario = await this.TipoHorarioUseCase.delete(Number(id));

      res.status(200).json({ message: 'Tipo de horario apagado.' });

    } catch (error: any) {
      if (error instanceof TipoHorarioNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar apagar tipo de horario' });
      }
    }
  };

}
