import { Request, Response } from 'express';
import { CentroCustoUseCase } from '../use-cases/CentroCustoUseCase';
import { ICentroCusto } from '../interfaces/CentroCusto.interface';
import { CentroCustoNotFound } from '../errors/CentroCustoNotFound';
import { CentroCustoAlreadyExists } from '../errors/CentroCustoAlreadyExists';

export class CentroCustoController {
  
  constructor(private CentroCustoUseCase: CentroCustoUseCase) {
    this.CentroCustoUseCase = CentroCustoUseCase;
  }

  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const CentroCusto = await this.CentroCustoUseCase.getAll();
      res.status(200).json(CentroCusto);

    } catch (error: any) {
      if (error instanceof CentroCustoNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar centro de custo' });
      }
    }
  };

  public show = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const CentroCusto = await this.CentroCustoUseCase.getById(Number(id));

      res.status(200).json(CentroCusto);
    } catch (error: any) {
      if (error instanceof CentroCustoNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar centro de custo' });
      }
    }
  };

  public insert = async (req: Request, res: Response): Promise<void> => {
    try {
      const { descricao, situacao } = req.body;

      const CentroCusto = await this.CentroCustoUseCase.createCentroCusto(descricao, {
        descricao,
        situacao,
      });

      res.status(201).json({ CentroCusto, message: 'Centro de custo criado com sucesso.' });
    } catch (error: any) {
      if (error instanceof CentroCustoAlreadyExists) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao criar centro de custo' });
      }
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const { descricao, situacao } = req.body;

      const CentroCusto = await this.CentroCustoUseCase.update(Number(id), {
        descricao,
        situacao,
      });

      res
        .status(200)
        .json({ CentroCusto, message: 'Centro de custo atualizado com sucesso.' });
    } catch (error: any) {
      if (error instanceof CentroCustoNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar atualizar o centro de custo' });
      }
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const CentroCusto = await this.CentroCustoUseCase.delete(Number(id));

      res.status(200).json({ message: 'Centro de custo apagado.' });

    } catch (error: any) {
      if (error instanceof CentroCustoNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar apagar centro de custo' });
      }
    }
  };

}
