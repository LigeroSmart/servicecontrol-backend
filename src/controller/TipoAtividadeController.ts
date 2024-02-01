import { Request, Response } from 'express';
import { TipoAtividadeUseCase } from '../use-cases/TipoAtividadeUseCase';
import { ITipoAtividade } from '../interfaces/TipoAtividade.interface';
import { TipoAtividadeNotFound } from '../errors/TipoAtividadeNotFound';
import { TipoAtividadeAlreadyExists } from '../errors/TipoAtividadeAlreadyExists';

export class TipoAtividadeController {
  
  constructor(private TipoAtividadeUseCase: TipoAtividadeUseCase) {
    this.TipoAtividadeUseCase = TipoAtividadeUseCase;
  }

  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const TipoAtividade = await this.TipoAtividadeUseCase.getAll();
      res.status(200).json(TipoAtividade);

    } catch (error: any) {
      if (error instanceof TipoAtividadeNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar tipo de atividade' });
      }
    }
  };

  public show = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const TipoAtividade = await this.TipoAtividadeUseCase.getById(Number(id));

      res.status(200).json(TipoAtividade);
    } catch (error: any) {
      if (error instanceof TipoAtividadeNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar tipo de atividade' });
      }
    }
  };

  public insert = async (req: Request, res: Response): Promise<void> => {
    try {
      const { descricao, situacao } = req.body;

      const TipoAtividade = await this.TipoAtividadeUseCase.createTipoAtividade(descricao, {
        descricao,
        situacao,
      });

      res.status(201).json({ TipoAtividade, message: 'Tipo de atividade criado com sucesso.' });
    } catch (error: any) {
      if (error instanceof TipoAtividadeAlreadyExists) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao criar tipo de atividade' });
      }
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const { descricao, situacao } = req.body;

      const TipoAtividade = await this.TipoAtividadeUseCase.update(Number(id), {
        descricao,
        situacao,
      });

      res
        .status(200)
        .json({ TipoAtividade, message: 'Tipo de atividade atualizado com sucesso.' });
    } catch (error: any) {
      if (error instanceof TipoAtividadeNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar atualizar o tipo de atividade' });
      }
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const TipoAtividade = await this.TipoAtividadeUseCase.delete(Number(id));

      res.status(200).json({ message: 'Tipo de atividade apagado.' });

    } catch (error: any) {
      if (error instanceof TipoAtividadeNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar apagar tipo de atividade' });
      }
    }
  };

}
