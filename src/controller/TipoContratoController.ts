import { Request, Response } from 'express';
import { TipoContratoUseCase } from '../use-cases/TipoContratoUseCase';
import { ITipoContrato } from '../interfaces/TipoContrato.interface';
import { TipoContratoNotFound } from '../errors/TipoContratoNotFound';
import { TipoContratoAlreadyExists } from '../errors/TipoContratoAlreadyExists';

export class TipoContratoController {
  
  constructor(private TipoContratoUseCase: TipoContratoUseCase) {
    this.TipoContratoUseCase = TipoContratoUseCase;
  }

  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const TipoContrato = await this.TipoContratoUseCase.getAll();
      res.status(200).json(TipoContrato);

    } catch (error: any) {
      if (error instanceof TipoContratoNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar tipo de contrato' });
      }
    }
  };

  public show = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const TipoContrato = await this.TipoContratoUseCase.getById(Number(id));

      res.status(200).json(TipoContrato);
    } catch (error: any) {
      if (error instanceof TipoContratoNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar tipo de contrato' });
      }
    }
  };

  public insert = async (req: Request, res: Response): Promise<void> => {
    try {
      const { descricao, cobranca_unica, situacao } = req.body;

      const TipoContrato = await this.TipoContratoUseCase.createTipoContrato(descricao, {
        descricao,
        cobranca_unica,
        situacao,
      });

      res.status(201).json({ TipoContrato, message: 'Tipo de contrato criado com sucesso.' });
    } catch (error: any) {
      if (error instanceof TipoContratoAlreadyExists) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao criar tipo de contrato' });
      }
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const { descricao, cobranca_unica, situacao } = req.body;

      const TipoContrato = await this.TipoContratoUseCase.update(Number(id), {
        descricao,
        cobranca_unica,
        situacao,
      });

      res
        .status(200)
        .json({ TipoContrato, message: 'Tipo de contrato atualizado com sucesso.' });
    } catch (error: any) {
      if (error instanceof TipoContratoNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar atualizar o tipo de contrato' });
      }
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const TipoContrato = await this.TipoContratoUseCase.delete(Number(id));

      res.status(200).json({ message: 'Tipo de contrato apagado.' });

    } catch (error: any) {
      if (error instanceof TipoContratoNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar apagar tipo de contrato' });
      }
    }
  };

}
