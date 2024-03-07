import { Request, Response } from 'express';
import { ContratoUseCase } from '../use-cases/ContratoUseCase';
import { IContrato } from '../interfaces/Contrato.interface';
import { ContratoNotFound } from '../errors/ContratoNotFound';
import { ContratoAlreadyExists } from '../errors/ContratoAlreadyExists';
import { empty } from '@prisma/client/runtime/library';
import { ClienteUseCase } from '../use-cases/ClienteUseCase';
import { ClienteNotFound } from '../errors/ClienteNotFound';
import { ClienteInativo } from '../errors/ClienteInativo';
import { TipoContratoUseCase } from '../use-cases/TipoContratoUseCase';
import { TipoContratoNotFound } from '../errors/TipoContratoNotFound';
import { TipoContratoInativo } from '../errors/TipoContratoInativo';
import { CentroCustoUseCase } from '../use-cases/CentroCustoUseCase';
import { CentroCustoNotFound } from '../errors/CentroCustoNotFound';
import { CentroCustoInativo } from '../errors/CentroCustoInativo';

export class ContratoController {
  
  constructor(
    private ContratoUseCase: ContratoUseCase,
    private clienteUseCase: ClienteUseCase,
    private tipoContratoUseCase: TipoContratoUseCase,
    private centroCustoUseCase: CentroCustoUseCase,
  ) 
  {
    this.ContratoUseCase = ContratoUseCase;
    this.clienteUseCase = clienteUseCase;
    this.tipoContratoUseCase = tipoContratoUseCase;
    this.centroCustoUseCase = centroCustoUseCase;
  }

  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const Contrato = await this.ContratoUseCase.getAll();
      res.status(200).json(Contrato);

    } catch (error: any) {
      if (error instanceof ContratoNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar contrato' });
      }
    }
  };

  public show = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const Contrato = await this.ContratoUseCase.getById(Number(id));

      res.status(200).json(Contrato);
    } catch (error: any) {
      if (error instanceof ContratoNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar contrato' });
      }
    }
  };

  public insert = async (req: Request, res: Response): Promise<void> => {
    try {
      const { cliente_id, tipo_contrato_id, centro_custo_id, numero, descricao, inicio_vigencia, termino_vigencia, termino_contrato, valor_mensal, situacao } = req.body;
      
      const cliente = await this.clienteUseCase.getById(Number(cliente_id));

      if ( (cliente) && (cliente.situacao == 'I')) {
        throw new ClienteInativo();
      }

      const tipoContrato = await this.tipoContratoUseCase.getById(Number(tipo_contrato_id));

      if ( (tipoContrato) && (tipoContrato.situacao == 'I')) {
        throw new TipoContratoInativo();
      }

      const centroCusto = await this.centroCustoUseCase.getById(Number(centro_custo_id));

      if ( (centroCusto) && (centroCusto.situacao == 'I')) {
        throw new CentroCustoInativo();
      }

      const Contrato = await this.ContratoUseCase.createContrato(numero, {
        cliente_id,
        tipo_contrato_id,
        centro_custo_id,
        numero,
        descricao,
        inicio_vigencia,
        termino_vigencia,
        termino_contrato,
        valor_mensal,
        situacao,
      });

      res.status(201).json({ Contrato, message: 'Contrato criado com sucesso.' });
    } catch (error: any) {
      if (error instanceof ContratoAlreadyExists) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof ClienteNotFound) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof ClienteInativo) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof TipoContratoNotFound) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof TipoContratoInativo) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof CentroCustoNotFound) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof CentroCustoInativo) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao criar contrato' });
      }
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const { cliente_id, tipo_contrato_id, centro_custo_id, numero, descricao, inicio_vigencia, termino_vigencia, termino_contrato, valor_mensal, situacao } = req.body;

      const cliente = await this.clienteUseCase.getById(Number(cliente_id));

      const tipoContrato = await this.tipoContratoUseCase.getById(Number(tipo_contrato_id));

      if ( (tipoContrato) && (tipoContrato.situacao == 'I')) {
        throw new TipoContratoInativo();
      }

      const centroCusto = await this.centroCustoUseCase.getById(Number(centro_custo_id));

      if ( (centroCusto) && (centroCusto.situacao == 'I')) {
        throw new CentroCustoInativo();
      }

      if ( (cliente) && (cliente.situacao == 'I')) {
        throw new ClienteInativo();
      }      

      const Contrato = await this.ContratoUseCase.update(Number(id), {
        cliente_id,
        tipo_contrato_id,
        centro_custo_id,
        numero,
        descricao,
        inicio_vigencia,
        termino_vigencia,
        termino_contrato,
        valor_mensal,
        situacao,
      });

      res
        .status(200)
        .json({ Contrato, message: 'Contrato atualizado com sucesso.' });
    } catch (error: any) {
      if (error instanceof ContratoNotFound) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof ClienteNotFound) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof ClienteInativo) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof TipoContratoNotFound) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof TipoContratoInativo) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof CentroCustoNotFound) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof CentroCustoInativo) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar atualizar o contrato' });
      }
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const Contrato = await this.ContratoUseCase.delete(Number(id));

      res.status(200).json({ message: 'Contrato apagado.' });

    } catch (error: any) {
      if (error instanceof ContratoNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar apagar contrato' });
      }
    }
  };

}
