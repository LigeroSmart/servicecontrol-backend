import { Request, Response } from 'express';
import { ModeloHorarioUseCase } from '../use-cases/ModeloHorarioUseCase';
import { IModeloHorario } from '../interfaces/ModeloHorario.interface';
import { ModeloHorarioNotFound } from '../errors/ModeloHorarioNotFound';
import { ModeloHorarioAlreadyExists } from '../errors/ModeloHorarioAlreadyExists';

export class ModeloHorarioController {
  
  constructor(private ModeloHorarioUseCase: ModeloHorarioUseCase) {
    this.ModeloHorarioUseCase = ModeloHorarioUseCase;
  }

  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const { situacao } = req.query;

      let modeloHorario = null;
  
      if (!situacao) {
        modeloHorario = await this.ModeloHorarioUseCase.getAll();
      } else {
        modeloHorario = await this.ModeloHorarioUseCase.getBySituacao(situacao);
      }

      // const ModeloHorario = await this.ModeloHorarioUseCase.getAll();
      res.status(200).json(modeloHorario);

    } catch (error: any) {
      if (error instanceof ModeloHorarioNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar modelo horario' });
      }
    }
  };

  public show = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const ModeloHorario = await this.ModeloHorarioUseCase.getById(Number(id));

      res.status(200).json(ModeloHorario);
    } catch (error: any) {
      if (error instanceof ModeloHorarioNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar ModeloHorario' });
      }
    }
  };

  public insert = async (req: Request, res: Response): Promise<void> => {
    try {
      const { descricao, tipo_horario_id, inicio, termino, situacao } = req.body;

      const ModeloHorario = await this.ModeloHorarioUseCase.createModeloHorario(descricao, {
        descricao,
        tipo_horario_id,
        inicio,
        termino,
        situacao,
      });

      res.status(201).json({ ModeloHorario, message: 'Modelo de horario criado com sucesso.' });
    } catch (error: any) {
      if (error instanceof ModeloHorarioAlreadyExists) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao criar Modelo de horario' });
      }
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const { descricao, tipo_horario_id, inicio, termino, situacao } = req.body;

      const ModeloHorario = await this.ModeloHorarioUseCase.update(Number(id), {
        descricao,
        tipo_horario_id,
        inicio,
        termino,
        situacao,
      });

      res
        .status(200)
        .json({ ModeloHorario, message: 'Modelo de horario atualizado com sucesso.' });
    } catch (error: any) {
      if (error instanceof ModeloHorarioNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar atualizar o Modelo de horario' });
      }
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const ModeloHorario = await this.ModeloHorarioUseCase.delete(Number(id));

      res.status(200).json({ message: 'Modelo de horario apagado.' });

    } catch (error: any) {
      if (error instanceof ModeloHorarioNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao tentar apagar Modelo de horario' });
      }
    }
  };

}
