import { Request, Response } from 'express';
import { AtividadeUseCase } from '../use-cases/AtividadeUseCase';
import { IAtividade } from '../interfaces/Atividade.interface';
import { AtividadeNotFound } from '../errors/AtividadeNotFound';
import { AtividadeAlreadyExists } from '../errors/AtividadeAlreadyExists';
import { empty } from '@prisma/client/runtime/library';
import { UsuarioUseCase } from '../use-cases/UsuarioUseCase';
import { UsuarioNotFound } from '../errors/UsuarioNotFound';
import { TipoHorarioNotFound } from '../errors/TipoHorarioNotFound';
import { TipoHorarioUseCase } from '../use-cases/TipoHorarioUseCase';
import { TipoAtividadeNotFound } from '../errors/TipoAtividadeNotFound';
import { TipoAtividadeUseCase } from '../use-cases/TipoAtividadeUseCase';


export class AtividadeController {
  
  constructor(
    private AtividadeUseCase: AtividadeUseCase,
    private UsuarioUseCase: UsuarioUseCase,
    private TipoHorarioUseCase: TipoHorarioUseCase,
    private TipoAtividadeUseCase: TipoAtividadeUseCase,
  ) 
  {
    this.AtividadeUseCase = AtividadeUseCase;
    this.UsuarioUseCase = UsuarioUseCase;
    this.TipoHorarioUseCase = TipoHorarioUseCase;
    this.TipoAtividadeUseCase = TipoAtividadeUseCase;
  }

  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      // const atividade = await this.AtividadeUseCase.getAll();

      const { ticket } = req.query;
      let atividade = null;
  
      if (!ticket) {
        atividade = await this.AtividadeUseCase.getAll();
      } else {
        atividade = await this.AtividadeUseCase.getByTicket(ticket);
      }

      res.status(200).json(atividade);

    } catch (error: any) {
      if (error instanceof AtividadeNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar atividade' });
      }
    }
  };

  public show = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const atividade = await this.AtividadeUseCase.getById(Number(id));

      res.status(200).json(atividade);
    } catch (error: any) {
      if (error instanceof AtividadeNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar atividade' });
      }
    }
  };

  public insert = async (req: Request, res: Response): Promise<void> => {
    try {
      const { usuario_id, tipo_horario_id, tipo_atividade_id, ticket, codigo, data_inicio, hora_inicio, data_final, hora_final, assunto, descricao } = req.body;
     
      const usuario = await this.UsuarioUseCase.getById(Number(usuario_id));

      if (!usuario) {
        throw new UsuarioNotFound;
      }

      // const tipoHorario = await this.TipoHorarioUseCase.getById(Number(tipo_horario_id));

      // if (!tipoHorario) {
      //   throw new TipoHorarioNotFound;
      // }

      const tipoAtividade = await this.TipoAtividadeUseCase.getById(Number(tipo_atividade_id));

      if (!tipoAtividade) {
        throw new TipoAtividadeNotFound;
      }


      const atividade = await this.AtividadeUseCase.createAtividade(ticket, {
        usuario_id,
        tipo_atividade_id,
        ticket,
        codigo,
        data_inicio,
        hora_inicio,
        data_final,
        hora_final,
        assunto,
        descricao,
      });

      res.status(201).json({ atividade, message: 'Atividade criada com sucesso.' });
    } catch (error: any) {
      if (error instanceof AtividadeAlreadyExists) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof UsuarioNotFound) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof TipoHorarioNotFound) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof TipoAtividadeNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao criar atividade' });
      }
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const { usuario_id, tipo_horario_id, tipo_atividade_id, ticket, codigo, data_inicio, hora_inicio, data_final, hora_final, assunto, descricao } = req.body;

    //   const modeloHorario = await this.ModeloHorarioUseCase.getById(Number(modelo_horario_id));

    //   if ( (modeloHorario) && (modeloHorario.situacao == 'I')) {
    //     throw new ModeloHorarioInativo();
    //   }      

      const atividade = await this.AtividadeUseCase.update(Number(id), {
        usuario_id,
        tipo_horario_id,
        tipo_atividade_id,
        ticket,
        codigo,
        data_inicio,
        hora_inicio,
        data_final,
        hora_final,
        assunto,
        descricao,
      });

      res
        .status(200)
        .json({ atividade, message: 'Atividade atualizada com sucesso.' });
    } catch (error: any) {
      if (error instanceof AtividadeNotFound) {
        res.status(404).json({ error: error.message });
      } 
      
    //   else if (error instanceof ModeloHorarioNotFound) {
    //     res.status(404).json({ error: error.message });
    //   } else if (error instanceof ModeloHorarioInativo) {
    //     res.status(404).json({ error: error.message });
    //   } 

      else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar atualizar a atividade' });
      }
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const atividade = await this.AtividadeUseCase.delete(Number(id));

      res.status(200).json({ message: 'Atividade apagada.' });

    } catch (error: any) {
      if (error instanceof AtividadeNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar apagar atividade' });
      }
    }
  };

}
