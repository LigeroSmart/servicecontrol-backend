import { TipoContratoAlreadyExists } from '../errors/TipoContratoAlreadyExists';
import { TipoContratoInativo } from '../errors/TipoContratoInativo';
import { TipoContratoNotFound } from '../errors/TipoContratoNotFound';
import { CreateTipoContratoDTO, ITipoContrato, UpdateTipoContratoDTO } from '../interfaces/TipoContrato.interface';
import { DbTipoContratoRepository } from '../repository/DbTipoContratoRepository';
import { Console } from 'console';

export class TipoContratoUseCase {
  constructor(
    private TipoContratoRepository: DbTipoContratoRepository) {
      TipoContratoRepository = TipoContratoRepository;
  }

  public async createTipoContrato(
    descricao: string,
    data: CreateTipoContratoDTO
  ): Promise<ITipoContrato | null> {

    // const existsTipoContratoByDescricao = await this.TipoContratoRepository.getByDescricao(
    //   descricao
    // );

    // if (existsTipoContratoByDescricao) {
    //   throw new TipoContratoAlreadyExists();
    // }

    const TipoContrato = await this.TipoContratoRepository.createTipoContrato({
      descricao: data.descricao,
      cobranca_unica: data.cobranca_unica,
      situacao: data.situacao
    });

    return TipoContrato;
  }

  public async getAll(): Promise<ITipoContrato[] | null> {
    const TipoContrato = await this.TipoContratoRepository.getAll();

    // if (!TipoContrato || TipoContrato.length === 0) {
    //   throw new TipoContratoNotFound();
    // }

    return TipoContrato;
  }

  public async getById(id: number): Promise<ITipoContrato | null> {
    const TipoContrato = await this.TipoContratoRepository.getById(id);

    if (!TipoContrato) {
      throw new TipoContratoNotFound();
    }

    return TipoContrato;
  }

  public async update(
    id: number, 
    data: UpdateTipoContratoDTO
    ): Promise<ITipoContrato | null> {
    const existsTipoContrato = await this.getById(id);

    if (!existsTipoContrato) {
      throw new TipoContratoNotFound();
    }

    const TipoContrato = await this.TipoContratoRepository.update(id, {
      descricao: data.descricao,
      cobranca_unica: data.cobranca_unica,
      situacao: data.situacao,
    });

    return TipoContrato;
  }

  public async delete(id: number): Promise<ITipoContrato | null> {
    const existsTipoContrato = await this.getById(id);

    if (!existsTipoContrato) {
      throw new TipoContratoNotFound();
    }

    const TipoContrato = await this.TipoContratoRepository.delete(id);

    return TipoContrato;
  }
  
}
