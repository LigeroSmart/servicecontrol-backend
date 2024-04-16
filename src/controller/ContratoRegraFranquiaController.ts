import { Request, Response } from 'express';
import { ContratoRegraFranquiaUseCase } from '../use-cases/ContratoRegraFranquiaUseCase';
import { IContratoRegraFranquia } from '../interfaces/ContratoRegraFranquia.interface';
import { ContratoRegraFranquiaNotFound } from '../errors/ContratoRegraFranquiaNotFound';
import { ContratoRegraFranquiaAlreadyExists } from '../errors/ContratoRegraFranquiaAlreadyExists';

export class ContratoRegraFranquiaController {
  
  constructor(private contratoRegraFranquiaUseCase: ContratoRegraFranquiaUseCase) {
    this.contratoRegraFranquiaUseCase = contratoRegraFranquiaUseCase;
  }

  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const { contrato_id } = req.query;

      if (contrato_id == null) {
        throw new ContratoRegraFranquiaNotFound();        
      }
      
      const contratoRegraFranquia = await this.contratoRegraFranquiaUseCase.getAll(Number(contrato_id));
      
      res.status(200).json(contratoRegraFranquia);  

    } catch (error: any) {
      if (error instanceof ContratoRegraFranquiaNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar regra de franquia' });
      }
    }
  };

  public show = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const ContratoRegraFranquia = await this.contratoRegraFranquiaUseCase.getById(Number(id));

      res.status(200).json(ContratoRegraFranquia);
    } catch (error: any) {
      if (error instanceof ContratoRegraFranquiaNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar regra de franquia.' });
      }
    }
  };


  public insert = async (req: Request, res: Response): Promise<void> => {
    try {
      const { contrato_id, qtd_horas, valor_hora, qtd_meses, franquia_fixa,
              regra_franquia_horario, 
              regra_franquia_servico,
              regra_franquia_tipo_atividade,
              regra_franquia_tipo_chamado
      } = req.body;

      const ContratoRegraFranquia = await this.contratoRegraFranquiaUseCase.createContratoRegraFranquia({
        contrato_id,
        qtd_horas, 
        valor_hora, 
        qtd_meses, 
        franquia_fixa
      },
      regra_franquia_horario,
      regra_franquia_servico,
      regra_franquia_tipo_atividade,
      regra_franquia_tipo_chamado);

      res.status(201).json({ ContratoRegraFranquia, message: 'Regra de franquia criada com sucesso.' });
    } catch (error: any) {
      if (error instanceof ContratoRegraFranquiaAlreadyExists) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao criar regra de franquia' });
      }
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const { contrato_id, qtd_horas, valor_hora, qtd_meses, franquia_fixa,
              regra_franquia_horario,
              regra_franquia_servico,
              regra_franquia_tipo_atividade,
              regra_franquia_tipo_chamado
      } = req.body;

      const ContratoRegraFranquia = await this.contratoRegraFranquiaUseCase.update(Number(id), {
        contrato_id,
        qtd_horas, 
        valor_hora, 
        qtd_meses, 
        franquia_fixa
      },
      regra_franquia_horario,
      regra_franquia_servico,
      regra_franquia_tipo_atividade,
      regra_franquia_tipo_chamado);

      res
        .status(200)
        .json({ ContratoRegraFranquia, message: 'Regra de franquia atualizada com sucesso.' });
    } catch (error: any) {
      if (error instanceof ContratoRegraFranquiaNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar atualizar o regra de franquia' });
      }
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const ContratoRegraFranquia = await this.contratoRegraFranquiaUseCase.delete(Number(id));

      res.status(200).json({ message: 'Regra de franquia apagada.' });

    } catch (error: any) {
      if (error instanceof ContratoRegraFranquiaNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar apagar regra de franquia.' });
      }
    }
  };

}
