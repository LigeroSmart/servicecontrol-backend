import { Request, Response } from 'express';
import { ServicoClienteUseCase } from '../use-cases/ServicoClienteUseCase';
import { IServicoCliente } from '../interfaces/Servico.Cliente.interface';
import { ServicoClienteNotFound } from '../errors/ServicoClienteNotFound';
import { ServicoClienteAlreadyExists } from '../errors/ServicoClienteAlreadyExists';
import { ClienteNotFound } from '../errors/ClienteNotFound';
import { ClienteInativo } from '../errors/ClienteInativo';
import { ClienteUseCase } from '../use-cases/ClienteUseCase';
import { ServicoNotFound } from '../errors/ServicoNotFound';
import { ServicoInativo } from '../errors/ServicoInativo';
import { ServicoUseCase } from '../use-cases/ServicoUseCase';

export class ServicoClienteController {
  
  constructor(
    private servicoClienteUseCase: ServicoClienteUseCase,
    private clienteUseCase: ClienteUseCase,
    private servicoUseCase: ServicoUseCase,
  ) 
  {
    this.servicoClienteUseCase = servicoClienteUseCase;
    this.clienteUseCase = clienteUseCase;
    this.servicoUseCase = servicoUseCase;
  }

  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const servicoCliente = await this.servicoClienteUseCase.getAll();
      res.status(200).json(servicoCliente);  

    } catch (error: any) {
      if (error instanceof ServicoClienteNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar serviço do cliente' });
      }
    }
  };

  public show = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const servicoCliente = await this.servicoClienteUseCase.getById(Number(id));

      res.status(200).json(servicoCliente);
    } catch (error: any) {
      if (error instanceof ServicoClienteNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar serviço do cliente' });
      }
    }
  };


  public insert = async (req: Request, res: Response): Promise<void> => {
    try {
      const { servico_id, cliente_id } = req.body;

      const cliente = await this.clienteUseCase.getById(Number(cliente_id));

      if ( (cliente) && (cliente.situacao == 'I')) {
        throw new ClienteInativo();
      }

      const servico = await this.servicoUseCase.getById(Number(servico_id));

      if ( (servico) && (servico.situacao == 'I')) {
        throw new ServicoInativo();
      }

      const servicoCliente = await this.servicoClienteUseCase.createServicoCliente(servico_id, cliente_id, {
        servico_id,
        cliente_id,
      });      

      res.status(201).json({ servicoCliente, message: 'Serviço do cliente criado com sucesso.' });
    } catch (error: any) {
      if (error instanceof ServicoClienteAlreadyExists) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof ClienteNotFound) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof ClienteInativo) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof ServicoNotFound) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof ServicoInativo) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao criar serviço do cliente' });
      }
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const { servico_id, cliente_id } = req.body;

      const cliente = await this.clienteUseCase.getById(Number(cliente_id));

      if ( (cliente) && (cliente.situacao == 'I')) {
        throw new ClienteInativo();
      }

      const servico = await this.servicoUseCase.getById(Number(servico_id));

      if ( (servico) && (servico.situacao == 'I')) {
        throw new ServicoInativo();
      }      

      const servicoCliente = await this.servicoClienteUseCase.update(Number(id), {
        servico_id,
        cliente_id,
      });

      res
        .status(200)
        .json({ servicoCliente, message: 'Serviço do cliente atualizado com sucesso.' });
    } catch (error: any) {
      if (error instanceof ServicoClienteNotFound) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof ClienteNotFound) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof ClienteInativo) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof ServicoNotFound) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof ServicoInativo) {
        res.status(404).json({ error: error.message });
      }  else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar atualizar o ServicoCliente' });
      }
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const servicoCliente = await this.servicoClienteUseCase.delete(Number(id));

      res.status(200).json({ message: 'Serviço do cliente apagado.' });

    } catch (error: any) {
      if (error instanceof ServicoClienteNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar apagar serviço do cliente' });
      }
    }
  };

}
