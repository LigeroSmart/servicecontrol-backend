import { TipoHorarioAlreadyExists } from '../errors/TipoHorarioAlreadyExists';
import { TipoHorarioInativo } from '../errors/TipoHorarioInativo';
import { TipoHorarioNotFound } from '../errors/TipoHorarioNotFound';
import { CreateTipoHorarioDTO, ITipoHorario, UpdateTipoHorarioDTO } from '../interfaces/TipoHorario.interface';
import { DbTipoHorarioRepository } from '../repository/DbTipoHorarioRepository';
import { Console } from 'console';

export class TipoHorarioUseCase {
  constructor(
    private TipoHorarioRepository: DbTipoHorarioRepository) {
      TipoHorarioRepository = TipoHorarioRepository;
  }

  public async createTipoHorario(
    descricao: string,
    data: CreateTipoHorarioDTO
  ): Promise<ITipoHorario | null> {

    const existsTipoHorarioByDescricao = await this.TipoHorarioRepository.getByDescricao(
      descricao
    );

    if (existsTipoHorarioByDescricao) {
      throw new TipoHorarioAlreadyExists();
    }

    const TipoHorario = await this.TipoHorarioRepository.createTipoHorario({
      descricao: data.descricao,
      situacao: data.situacao
    });

    return TipoHorario;
  }

  public async getAll(): Promise<ITipoHorario[] | null> {
    const TipoHorario = await this.TipoHorarioRepository.getAll();

    // if (!TipoHorario || TipoHorario.length === 0) {
    //   throw new TipoHorarioNotFound();
    // }

    return TipoHorario;
  }

  public async getById(id: number): Promise<ITipoHorario | null> {
    const TipoHorario = await this.TipoHorarioRepository.getById(id);

    if (!TipoHorario) {
      throw new TipoHorarioNotFound();
    }

    return TipoHorario;
  }

  public async update(
    id: number, 
    data: UpdateTipoHorarioDTO
    ): Promise<ITipoHorario | null> {
    const existsTipoHorario = await this.getById(id);

    if (!existsTipoHorario) {
      throw new TipoHorarioNotFound();
    }

    const TipoHorario = await this.TipoHorarioRepository.update(id, {
      descricao: data.descricao,
      situacao: data.situacao,
    });

    return TipoHorario;
  }

  public async delete(id: number): Promise<ITipoHorario | null> {
    const existsTipoHorario = await this.getById(id);

    if (!existsTipoHorario) {
      throw new TipoHorarioNotFound();
    }

    const TipoHorario = await this.TipoHorarioRepository.delete(id);

    return TipoHorario;
  }
  
}
