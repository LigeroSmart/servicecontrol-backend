import { TipoAtividadeAlreadyExists } from '../errors/TipoAtividadeAlreadyExists';
import { TipoAtividadeInativo } from '../errors/TipoAtividadeInativo';
import { TipoAtividadeNotFound } from '../errors/TipoAtividadeNotFound';
import { CreateTipoAtividadeDTO, ITipoAtividade, UpdateTipoAtividadeDTO } from '../interfaces/TipoAtividade.interface';
import { DbTipoAtividadeRepository } from '../repository/DbTipoAtividadeRepository';
import { Console } from 'console';

export class TipoAtividadeUseCase {
  constructor(
    private TipoAtividadeRepository: DbTipoAtividadeRepository) {
      TipoAtividadeRepository = TipoAtividadeRepository;
  }

  public async createTipoAtividade(
    descricao: string,
    data: CreateTipoAtividadeDTO
  ): Promise<ITipoAtividade | null> {

    const existsTipoAtividadeByDescricao = await this.TipoAtividadeRepository.getByDescricao(
      descricao
    );

    if (existsTipoAtividadeByDescricao) {
      throw new TipoAtividadeAlreadyExists();
    }

    const TipoAtividade = await this.TipoAtividadeRepository.createTipoAtividade({
      descricao: data.descricao,
      situacao: data.situacao
    });

    return TipoAtividade;
  }

  public async getAll(): Promise<ITipoAtividade[] | null> {
    const TipoAtividade = await this.TipoAtividadeRepository.getAll();

    // if (!TipoAtividade || TipoAtividade.length === 0) {
    //   throw new TipoAtividadeNotFound();
    // }

    return TipoAtividade;
  }

  public async getById(id: number): Promise<ITipoAtividade | null> {
    const TipoAtividade = await this.TipoAtividadeRepository.getById(id);

    if (!TipoAtividade) {
      throw new TipoAtividadeNotFound();
    }

    return TipoAtividade;
  }

  public async update(
    id: number, 
    data: UpdateTipoAtividadeDTO
    ): Promise<ITipoAtividade | null> {
    const existsTipoAtividade = await this.getById(id);

    if (!existsTipoAtividade) {
      throw new TipoAtividadeNotFound();
    }

    const TipoAtividade = await this.TipoAtividadeRepository.update(id, {
      descricao: data.descricao,
      situacao: data.situacao,
    });

    return TipoAtividade;
  }

  public async delete(id: number): Promise<ITipoAtividade | null> {
    const existsTipoAtividade = await this.getById(id);

    if (!existsTipoAtividade) {
      throw new TipoAtividadeNotFound();
    }

    const TipoAtividade = await this.TipoAtividadeRepository.delete(id);

    return TipoAtividade;
  }
  
}
