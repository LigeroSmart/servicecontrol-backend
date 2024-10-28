import { Request, Response } from 'express';
import { SlaUseCase } from '../use-cases/SlaUseCase';
import { ISla } from '../interfaces/SLA.interface';
import { SlaNotFound } from '../errors/SlaNotFound';
import { SlaAlreadyExists } from '../errors/SlaAlreadyExists';

export class SlaController {
  
  constructor(private SlaUseCase: SlaUseCase) {
    this.SlaUseCase = SlaUseCase;
  }

  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const Sla = await this.SlaUseCase.getAll();
      res.status(200).json(Sla);

    } catch (error: any) {
      if (error instanceof SlaNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar SLA' });
      }
    }
  };

  public show = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const Sla = await this.SlaUseCase.getById(Number(id));

      res.status(200).json(Sla);
    } catch (error: any) {
      if (error instanceof SlaNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar SLA' });
      }
    }
  };

  public insert = async (req: Request, res: Response): Promise<void> => {
    try {
      const { descricao, situacao, sla_ligero_id } = req.body;

      const Sla = await this.SlaUseCase.createSla(descricao, {
        descricao,
        situacao,
        sla_ligero_id,
      });

      res.status(201).json({ Sla, message: 'SLA criado com sucesso.' });
    } catch (error: any) {
      if (error instanceof SlaAlreadyExists) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao criar SLA' });
      }
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const { descricao, situacao, sla_ligero_id } = req.body;

      const Sla = await this.SlaUseCase.update(Number(id), {
        descricao,
        situacao,
        sla_ligero_id,
      });

      res
        .status(200)
        .json({ Sla, message: 'SLA atualizado com sucesso.' });
    } catch (error: any) {
      if (error instanceof SlaNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar atualizar o SLA' });
      }
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const Sla = await this.SlaUseCase.delete(Number(id));

      res.status(200).json({ message: 'SLA apagado.' });

    } catch (error: any) {
      if (error instanceof SlaNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar apagar SLA' });
      }
    }
  };

}
