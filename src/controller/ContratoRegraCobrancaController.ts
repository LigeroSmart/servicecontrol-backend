import { Request, Response } from 'express';
import { ContratoRegraCobrancaUseCase } from '../use-cases/ContratoRegraCobrancaUseCase';
import { IContratoRegraCobranca } from '../interfaces/ContratoRegraCobranca.interface';
import { ContratoRegraCobrancaNotFound } from '../errors/ContratoRegraCobrancaNotFound';
import { ContratoRegraCobrancaAlreadyExists } from '../errors/ContratoRegraCobrancaAlreadyExists';

export class ContratoRegraCobrancaController {
  
  constructor(private contratoRegraCobrancaUseCase: ContratoRegraCobrancaUseCase) {
    this.contratoRegraCobrancaUseCase = contratoRegraCobrancaUseCase;
  }

  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const { contrato_id } = req.query;
      
      const contratoRegraCobranca = await this.contratoRegraCobrancaUseCase.getAll(Number(contrato_id));
      
      res.status(200).json(contratoRegraCobranca);  

    } catch (error: any) {
      if (error instanceof ContratoRegraCobrancaNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar regra de cobrança' });
      }
    }
  };

  public show = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const ContratoRegraCobranca = await this.contratoRegraCobrancaUseCase.getById(Number(id));

      res.status(200).json(ContratoRegraCobranca);
    } catch (error: any) {
      if (error instanceof ContratoRegraCobrancaNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar regra de cobrança.' });
      }
    }
  };


  public insert = async (req: Request, res: Response): Promise<void> => {
    try {
      const { contrato_id, ordem, nome, valor, bloqueado, 
              regra_cobranca_horario, 
              regra_cobranca_servico,
              regra_cobranca_tipo_atividade,
              regra_cobranca_tipo_chamado
      } = req.body;

      const ContratoRegraCobranca = await this.contratoRegraCobrancaUseCase.createContratoRegraCobranca({
        contrato_id,
        ordem,
        nome,
        valor,
        bloqueado,
      },
      regra_cobranca_horario,
      regra_cobranca_servico,
      regra_cobranca_tipo_atividade,
      regra_cobranca_tipo_chamado);

      res.status(201).json({ ContratoRegraCobranca, message: 'Regra de cobrança criada com sucesso.' });
    } catch (error: any) {
      if (error instanceof ContratoRegraCobrancaAlreadyExists) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao criar regra de cobrança' });
      }
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const { contrato_id, ordem, nome, valor, bloqueado, 
              regra_cobranca_horario,
              regra_cobranca_servico,
              regra_cobranca_tipo_atividade,
              regra_cobranca_tipo_chamado
      } = req.body;

      const ContratoRegraCobranca = await this.contratoRegraCobrancaUseCase.update(Number(id), {
        contrato_id,
        ordem,
        nome,
        valor,
        bloqueado,
      },
      regra_cobranca_horario,
      regra_cobranca_servico,
      regra_cobranca_tipo_atividade,
      regra_cobranca_tipo_chamado);

      res
        .status(200)
        .json({ ContratoRegraCobranca, message: 'Regra de cobrança atualizada com sucesso.' });
    } catch (error: any) {
      if (error instanceof ContratoRegraCobrancaNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar atualizar o regra de cobrança' });
      }
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const ContratoRegraCobranca = await this.contratoRegraCobrancaUseCase.delete(Number(id));

      res.status(200).json({ message: 'Regra de cobrança apagada.' });

    } catch (error: any) {
      if (error instanceof ContratoRegraCobrancaNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar apagar regra de cobrança.' });
      }
    }
  };

}
