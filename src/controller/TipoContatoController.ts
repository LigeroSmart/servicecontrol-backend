import { Request, Response } from 'express';
import { TipoContatoUseCase } from '../use-cases/TipoContatoUseCase';
import { ITipoContato } from '../interfaces/TipoContato.interface';
import { TipoContatoNotFound } from '../errors/TipoContatoNotFound';
import { TipoContatoAlreadyExists } from '../errors/TipoContatoAlreadyExists';

export class TipoContatoController {
  
  constructor(private TipoContatoUseCase: TipoContatoUseCase) {
    this.TipoContatoUseCase = TipoContatoUseCase;
  }

  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const TipoContato = await this.TipoContatoUseCase.getAll();
      res.status(200).json(TipoContato);

    } catch (error: any) {
      if (error instanceof TipoContatoNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar tipo de contato' });
      }
    }
  };

  public show = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const TipoContato = await this.TipoContatoUseCase.getById(Number(id));

      res.status(200).json(TipoContato);
    } catch (error: any) {
      if (error instanceof TipoContatoNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar tipo de contato' });
      }
    }
  };

  public insert = async (req: Request, res: Response): Promise<void> => {
    try {
      const { descricao, situacao } = req.body;

      const TipoContato = await this.TipoContatoUseCase.createTipoContato(descricao, {
        descricao,
        situacao,
      });

      res.status(201).json({ TipoContato, message: 'Tipo de contato criado com sucesso.' });
    } catch (error: any) {
      if (error instanceof TipoContatoAlreadyExists) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao criar tipo de contato' });
      }
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const { descricao, situacao } = req.body;

      const TipoContato = await this.TipoContatoUseCase.update(Number(id), {
        descricao,
        situacao,
      });

      res
        .status(200)
        .json({ TipoContato, message: 'Tipo de contato atualizado com sucesso.' });
    } catch (error: any) {
      if (error instanceof TipoContatoNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar atualizar o tipo de contato' });
      }
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const TipoContato = await this.TipoContatoUseCase.delete(Number(id));

      res.status(200).json({ message: 'Tipo de contato apagado.' });

    } catch (error: any) {
      if (error instanceof TipoContatoNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar apagar tipo de contato' });
      }
    }
  };

}
