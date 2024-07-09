import { Request, Response } from 'express';
import { ContratoRegraSlaUseCase } from '../use-cases/ContratoRegraSLAUseCase';
import { IContratoRegraSla } from '../interfaces/ContratoRegraSLA.interface';
import { ContratoRegraSlaNotFound } from '../errors/ContratoRegraSLANotFound';
// import { ContratoRegraSlaAlreadyExists } from '../errors/ContratoRegraSlaAlreadyExists';

export class ContratoRegraSlaController {
  
  constructor(private contratoRegraSlaUseCase: ContratoRegraSlaUseCase) {
    this.contratoRegraSlaUseCase = contratoRegraSlaUseCase;
  }

  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const { contrato_id } = req.query;

      if (contrato_id == null) {
        throw new ContratoRegraSlaNotFound();        
      }
      
      const contratoRegraSla = await this.contratoRegraSlaUseCase.getAll(Number(contrato_id));
     
      if (contratoRegraSla[0].nome_contato == null && contratoRegraSla[0].descricao_sla == null && contratoRegraSla[0].descricao_servico == null) {
        //throw new ContratoRegraSlaNotFound();
        res.status(200).json('[]');  
      } else {
        res.status(200).json(contratoRegraSla);  
      }     
      

    } catch (error: any) {
      if (error instanceof ContratoRegraSlaNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar regra de SLA' });
      }
    }
  };

  public show = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const ContratoRegraSla = await this.contratoRegraSlaUseCase.getById(Number(id));

      res.status(200).json(ContratoRegraSla);
    } catch (error: any) {
      if (error instanceof ContratoRegraSlaNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar regra de SLA.' });
      }
    }
  };


  public insert = async (req: Request, res: Response): Promise<void> => {
    try {
      const { contrato_id,
              contato, 
              servico,
              sla
      } = req.body;

      const ContratoRegraSla = await this.contratoRegraSlaUseCase.createContratoRegraSla(
      contrato_id,
      contato,
      servico,
      sla);

      res.status(201).json({ ContratoRegraSla, message: 'Regra de SLA criada com sucesso.' });
    } catch (error: any) {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao criar regra de Sla' });
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const { contrato_id, 
              regra_sla_contato,
              regra_sla_servico,
              regra_sla_sla
      } = req.body;

      const ContratoRegraSla = await this.contratoRegraSlaUseCase.update(Number(id), {
        contrato_id,
      },
      regra_sla_contato,
      regra_sla_servico,
      regra_sla_sla);

      res
        .status(200)
        .json({ ContratoRegraSla, message: 'Regra de SLA atualizada com sucesso.' });
    } catch (error: any) {
      if (error instanceof ContratoRegraSlaNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar atualizar o regra de SLA' });
      }
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const ContratoRegraSla = await this.contratoRegraSlaUseCase.delete(Number(id));

      res.status(200).json({ message: 'Regra de SLA apagada.' });

    } catch (error: any) {
      if (error instanceof ContratoRegraSlaNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar apagar regra de SLA.' });
      }
    }
  };

}
