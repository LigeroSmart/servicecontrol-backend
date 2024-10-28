import { Request, Response } from 'express';
import { ServicoUseCase } from '../use-cases/ServicoUseCase';
import { IServico } from '../interfaces/Servico.interface';
import { ServicoNotFound } from '../errors/ServicoNotFound';
import { ServicoAlreadyExists } from '../errors/ServicoAlreadyExists';

export class ServicoController {
  
  constructor(private servicoUseCase: ServicoUseCase) {
    this.servicoUseCase = servicoUseCase;
  }

  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const Servico = await this.servicoUseCase.getAll();
      res.status(200).json(Servico);

    } catch (error: any) {
      if (error instanceof ServicoNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar serviço' });
      }
    }
  };

  public show = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const servico = await this.servicoUseCase.getById(Number(id));

      res.status(200).json(servico);
    } catch (error: any) {
      if (error instanceof ServicoNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar serviço' });
      }
    }
  };

  public insert = async (req: Request, res: Response): Promise<void> => {
    try {
      const { descricao, situacao, servico_ligero_id } = req.body;
      
      const servico = await this.servicoUseCase.createServico(descricao, {
        descricao,
        situacao,
        servico_ligero_id
      });

      res.status(201).json({ servico, message: 'Serviço criado com sucesso.' });
    } catch (error: any) {
      if (error instanceof ServicoAlreadyExists) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao criar serviço' });
      }
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const { descricao, situacao, servico_ligero_id } = req.body;

      const servico = await this.servicoUseCase.update(Number(id), {
        descricao,
        situacao,
        servico_ligero_id,
      });

      res
        .status(200)
        .json({ servico, message: 'Serviço atualizado com sucesso.' });
    } catch (error: any) {
      if (error instanceof ServicoNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar atualizar o serviço' });
      }
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const servico = await this.servicoUseCase.delete(Number(id));

      res.status(200).json({ message: 'Serviço apagado.' });

    } catch (error: any) {
      if (error instanceof ServicoNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar apagar serviço' });
      }
    }
  };

}
