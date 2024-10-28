import { Request, Response } from 'express';
import { ContatoUseCase } from '../use-cases/ContatoUseCase';
import { ClienteUseCase } from '../use-cases/ClienteUseCase';
import { IContato } from '../interfaces/Contato.interface';
import { ContatoNotFound } from '../errors/ContatoNotFound';
import { ContatoAlreadyExists } from '../errors/ContatoAlreadyExists';
import { empty } from '@prisma/client/runtime/library';
import { ClienteNotFound } from '../errors/ClienteNotFound';
import { ClienteInativo } from '../errors/ClienteInativo';

export class ContatoController {
  
  constructor(
    private contatoUseCase: ContatoUseCase,
    private clienteUseCase: ClienteUseCase,
  ) 
  {
    this.contatoUseCase = contatoUseCase;
    this.clienteUseCase = clienteUseCase;
  }

  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const contato = await this.contatoUseCase.getAll();
      res.status(200).json(contato);

    } catch (error: any) {
      if (error instanceof ContatoNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar Contato' });
      }
    }
  };

  public show = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const contato = await this.contatoUseCase.getById(Number(id));

      res.status(200).json(contato);
    } catch (error: any) {
      if (error instanceof ContatoNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar Contato' });
      }
    }
  };

  public insert = async (req: Request, res: Response): Promise<void> => {
    try {
      const { cliente_id, nome, telefone, ramal, celular, email, situacao } = req.body;

      const contato_ligero_id = 1;
      
      const cliente = await this.clienteUseCase.getById(Number(cliente_id));

      if ( (cliente) && (cliente.situacao == 'I')) {
        throw new ClienteInativo();
      }            

      const contato = await this.contatoUseCase.createContato({
        cliente_id,
        contato_ligero_id,
        nome,
        telefone,
        ramal,
        celular,
        email,
        situacao,
      });

      res.status(201).json({ contato, message: 'Contato criado com sucesso.' });
    } catch (error: any) {
      if (error instanceof ContatoAlreadyExists) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof ClienteNotFound) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof ClienteInativo) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao criar contato' });
      }
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const { cliente_id, nome, telefone, ramal, celular, email, situacao } = req.body;

      const contato_ligero_id = 1;

      const cliente = await this.clienteUseCase.getById(Number(cliente_id));

      if ( (cliente) && (cliente.situacao == 'I')) {
        throw new ClienteInativo();
      }      

      const contato = await this.contatoUseCase.update(Number(id), {
        cliente_id,
        contato_ligero_id,
        nome,
        telefone,
        ramal,
        celular,
        email,
        situacao,
      });

      res
        .status(200)
        .json({ contato, message: 'Contato atualizado com sucesso.' });
    } catch (error: any) {
      if (error instanceof ContatoNotFound) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof ClienteNotFound) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof ClienteInativo) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar atualizar o contato' });
      }
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const contato = await this.contatoUseCase.delete(Number(id));

      res.status(200).json({ message: 'Contato apagado.' });

    } catch (error: any) {
      if (error instanceof ContatoNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar apagar Contato' });
      }
    }
  };

}
