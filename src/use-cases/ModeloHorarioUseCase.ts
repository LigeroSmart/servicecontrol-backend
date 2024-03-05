import { ModeloHorarioAlreadyExists } from '../errors/ModeloHorarioAlreadyExists';
import { ModeloHorarioInativo } from '../errors/ModeloHorarioInativo';
import { ModeloHorarioNotFound } from '../errors/ModeloHorarioNotFound';
import { CreateModeloHorarioDTO, IModeloHorario, UpdateModeloHorarioDTO } from '../interfaces/ModeloHorario.interface';
import { DbModeloHorarioRepository } from '../repository/DbModeloHorarioRepository';
import { Console } from 'console';

export class ModeloHorarioUseCase {
  constructor(
    private ModeloHorarioRepository: DbModeloHorarioRepository) {
      ModeloHorarioRepository = ModeloHorarioRepository;
  }

  public async createModeloHorario(
    descricao: string,
    data: CreateModeloHorarioDTO
  ): Promise<IModeloHorario | null> {

    // const existsModeloHorarioByDescricao = await this.ModeloHorarioRepository.getByDescricao(
    //   descricao
    // );

    // if (existsModeloHorarioByDescricao) {
    //   throw new ModeloHorarioAlreadyExists();
    // }

    const ModeloHorario = await this.ModeloHorarioRepository.createModeloHorario({
      descricao: data.descricao,
      situacao: data.situacao
    });

    return ModeloHorario;
  }

  public async getAll(): Promise<IModeloHorario[] | null> {
    const ModeloHorario = await this.ModeloHorarioRepository.getAll();

    // if (!ModeloHorario || ModeloHorario.length === 0) {
    //   throw new ModeloHorarioNotFound();
    // }

    return ModeloHorario;
  }

  public async getById(id: number): Promise<IModeloHorario | null> {
    const ModeloHorario = await this.ModeloHorarioRepository.getById(id);

    if (!ModeloHorario) {
      throw new ModeloHorarioNotFound();
    }

    return ModeloHorario;
  }

  public async getBySituacao(situacao: string): Promise<IModeloHorario | null> {
    const modeloHorario = await this.ModeloHorarioRepository.getBySituacao(situacao);

    if (!modeloHorario) {
      throw new ModeloHorarioNotFound();
    }

    return modeloHorario;
  }  

  public async update(
    id: number, 
    data: UpdateModeloHorarioDTO
    ): Promise<IModeloHorario | null> {
    const existsModeloHorario = await this.getById(id);

    if (!existsModeloHorario) {
      throw new ModeloHorarioNotFound();
    }

    const ModeloHorario = await this.ModeloHorarioRepository.update(id, {
      descricao: data.descricao,
      situacao: data.situacao,
    });

    return ModeloHorario;
  }

  public async delete(id: number): Promise<IModeloHorario | null> {
    const existsModeloHorario = await this.getById(id);

    if (!existsModeloHorario) {
      throw new ModeloHorarioNotFound();
    }

    const ModeloHorario = await this.ModeloHorarioRepository.delete(id);

    return ModeloHorario;
  }
  
}
