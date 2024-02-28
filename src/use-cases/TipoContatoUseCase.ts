import { TipoContatoAlreadyExists } from '../errors/TipoContatoAlreadyExists';
import { TipoContatoInativo } from '../errors/TipoContatoInativo';
import { TipoContatoNotFound } from '../errors/TipoContatoNotFound';
import { CreateTipoContatoDTO, ITipoContato, UpdateTipoContatoDTO } from '../interfaces/TipoContato.interface';
import { DbTipoContatoRepository } from '../repository/DbTipoContatoRepository';
import { Console } from 'console';

export class TipoContatoUseCase {
  constructor(
    private TipoContatoRepository: DbTipoContatoRepository) {
      TipoContatoRepository = TipoContatoRepository;
  }

  public async createTipoContato(
    descricao: string,
    data: CreateTipoContatoDTO
  ): Promise<ITipoContato | null> {

    const existsTipoContatoByDescricao = await this.TipoContatoRepository.getByDescricao(
      descricao
    );

    if (existsTipoContatoByDescricao) {
      throw new TipoContatoAlreadyExists();
    }

    const TipoContato = await this.TipoContatoRepository.createTipoContato({
      descricao: data.descricao,
      situacao: data.situacao
    });

    return TipoContato;
  }

  public async getAll(): Promise<ITipoContato[] | null> {
    const TipoContato = await this.TipoContatoRepository.getAll();

    // if (!TipoContato || TipoContato.length === 0) {
    //   throw new TipoContatoNotFound();
    // }

    return TipoContato;
  }

  public async getById(id: number): Promise<ITipoContato | null> {
    const TipoContato = await this.TipoContatoRepository.getById(id);

    if (!TipoContato) {
      throw new TipoContatoNotFound();
    }

    return TipoContato;
  }

  public async update(
    id: number, 
    data: UpdateTipoContatoDTO
    ): Promise<ITipoContato | null> {
    const existsTipoContato = await this.getById(id);

    if (!existsTipoContato) {
      throw new TipoContatoNotFound();
    }

    const TipoContato = await this.TipoContatoRepository.update(id, {
      descricao: data.descricao,
      situacao: data.situacao,
    });

    return TipoContato;
  }

  public async delete(id: number): Promise<ITipoContato | null> {
    const existsTipoContato = await this.getById(id);

    if (!existsTipoContato) {
      throw new TipoContatoNotFound();
    }

    const TipoContato = await this.TipoContatoRepository.delete(id);

    return TipoContato;
  }
  
}
