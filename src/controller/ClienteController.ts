import { Request, Response } from 'express';
import { ClienteUseCase } from '../use-cases/ClienteUseCase';
import { ModeloHorarioUseCase } from '../use-cases/ModeloHorarioUseCase';
import { ICliente } from '../interfaces/Cliente.interface';
import { ClienteNotFound } from '../errors/ClienteNotFound';
import { ClienteAlreadyExists } from '../errors/ClienteAlreadyExists';
import { empty } from '@prisma/client/runtime/library';
import { ModeloHorarioNotFound } from '../errors/ModeloHorarioNotFound';
import { ModeloHorarioInativo } from '../errors/ModeloHorarioInativo';

export class ClienteController {
  
  constructor(
    private ClienteUseCase: ClienteUseCase,
    private ModeloHorarioUseCase: ModeloHorarioUseCase,
  ) 
  {
    this.ClienteUseCase = ClienteUseCase;
    this.ModeloHorarioUseCase = ModeloHorarioUseCase;
  }

  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const { situacao } = req.query;

      let cliente = null;
  
      if (!situacao) {
        cliente = await this.ClienteUseCase.getAll();
      } else {
        cliente = await this.ClienteUseCase.getBySituacao(situacao);
      }
      // const Cliente = await this.ClienteUseCase.getAll();
      res.status(200).json(cliente);

    } catch (error: any) {
      if (error instanceof ClienteNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar cliente' });
      }
    }
  };

  public show = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const Cliente = await this.ClienteUseCase.getById(Number(id));

      res.status(200).json(Cliente);
    } catch (error: any) {
      if (error instanceof ClienteNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar Cliente' });
      }
    }
  };

  public insert = async (req: Request, res: Response): Promise<void> => {
    try {
      const { modelo_horario_id, codigo, cnpj, ie, abreviacao, nome_fantasia, razao_social, cep, endereco, bairro, cidade, uf, site, observacao, situacao } = req.body;

      const cliente_ligero_id = 1;
      
      const modeloHorario = await this.ModeloHorarioUseCase.getById(Number(modelo_horario_id));

      if ( (modeloHorario) && (modeloHorario.situacao == 'I')) {
        throw new ModeloHorarioInativo();
      }          
           
      const Cliente = await this.ClienteUseCase.createCliente(codigo, {
        modelo_horario_id,
        codigo,
        cnpj,
        ie,
        abreviacao,
        nome_fantasia,
        razao_social,
        cep,
        endereco,
        bairro,
        cidade,
        uf,
        site,
        observacao,
        situacao,
        cliente_ligero_id,
      });

      res.status(201).json({ Cliente, message: 'Cliente criado com sucesso.' });
    } catch (error: any) {
      if (error instanceof ClienteAlreadyExists) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof ModeloHorarioNotFound) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof ModeloHorarioInativo) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao criar cliente' });
      }
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const { modelo_horario_id, codigo, cnpj, ie, abreviacao, nome_fantasia, razao_social, cep, endereco, bairro, cidade, uf, site, observacao, situacao } = req.body;

      const cliente_ligero_id = 1;

      const modeloHorario = await this.ModeloHorarioUseCase.getById(Number(modelo_horario_id));

      if ( (modeloHorario) && (modeloHorario.situacao == 'I')) {
        throw new ModeloHorarioInativo();
      }

      const cliente = await this.ClienteUseCase.update(Number(id), {
        modelo_horario_id,
        codigo,
        cnpj,
        ie,
        abreviacao,
        nome_fantasia,
        razao_social,
        cep,
        endereco,
        bairro,
        cidade,
        uf,
        site,
        observacao,
        situacao,
        cliente_ligero_id,
      });

      res
        .status(200)
        .json({ cliente, message: 'Cliente atualizado com sucesso.' });
    } catch (error: any) {
      if (error instanceof ClienteNotFound) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof ModeloHorarioNotFound) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof ModeloHorarioInativo) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar atualizar o cliente' });
      }
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const Cliente = await this.ClienteUseCase.delete(Number(id));

      res.status(200).json({ message: 'Cliente apagado.' });

    } catch (error: any) {
      if (error instanceof ClienteNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar apagar Cliente' });
      }
    }
  };

}
