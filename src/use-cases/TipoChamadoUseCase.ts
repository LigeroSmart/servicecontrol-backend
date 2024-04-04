import { TipoChamadoAlreadyExists } from '../errors/TipoChamadoAlreadyExists';
import { TipoChamadoInativo } from '../errors/TipoChamadoInativo';
import { TipoChamadoNotFound } from '../errors/TipoChamadoNotFound';
import { CreateTipoChamadoDTO, ITipoChamado, UpdateTipoChamadoDTO } from '../interfaces/TipoChamado.interface';
import { DbTipoChamadoRepository } from '../repository/DbTipoChamadoRepository';
import { Console } from 'console';

export class TipoChamadoUseCase {
  constructor(
    private TipoChamadoRepository: DbTipoChamadoRepository) {
      TipoChamadoRepository = TipoChamadoRepository;
  }

  public async createTipoChamado(
    descricao: string,
    data: CreateTipoChamadoDTO
  ): Promise<ITipoChamado | null> {

    const existsTipoChamadoByDescricao = await this.TipoChamadoRepository.getByDescricao(
      descricao
    );

    if (existsTipoChamadoByDescricao) {
      throw new TipoChamadoAlreadyExists();
    }

    const TipoChamado = await this.TipoChamadoRepository.createTipoChamado({
      descricao: data.descricao,
      situacao: data.situacao
    });

    return TipoChamado;
  }

  public async getAll(): Promise<ITipoChamado[] | null> {
    const TipoChamado = await this.TipoChamadoRepository.getAll();

    // if (!TipoChamado || TipoChamado.length === 0) {
    //   throw new TipoChamadoNotFound();
    // }

    return TipoChamado;
  }

  public async getById(id: number): Promise<ITipoChamado | null> {
    const TipoChamado = await this.TipoChamadoRepository.getById(id);

    if (!TipoChamado) {
      throw new TipoChamadoNotFound();
    }

    return TipoChamado;
  }

  public async update(
    id: number, 
    data: UpdateTipoChamadoDTO
    ): Promise<ITipoChamado | null> {
    const existsTipoChamado = await this.getById(id);

    if (!existsTipoChamado) {
      throw new TipoChamadoNotFound();
    }

    const TipoChamado = await this.TipoChamadoRepository.update(id, {
      descricao: data.descricao,
      situacao: data.situacao,
    });

    return TipoChamado;
  }

  public async delete(id: number): Promise<ITipoChamado | null> {
    const existsTipoChamado = await this.getById(id);

    if (!existsTipoChamado) {
      throw new TipoChamadoNotFound();
    }

    const TipoChamado = await this.TipoChamadoRepository.delete(id);

    return TipoChamado;
  }
  
}
