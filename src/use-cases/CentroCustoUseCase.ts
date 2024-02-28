import { CentroCustoAlreadyExists } from '../errors/CentroCustoAlreadyExists';
import { CentroCustoInativo } from '../errors/CentroCustoInativo';
import { CentroCustoNotFound } from '../errors/CentroCustoNotFound';
import { CreateCentroCustoDTO, ICentroCusto, UpdateCentroCustoDTO } from '../interfaces/CentroCusto.interface';
import { DbCentroCustoRepository } from '../repository/DbCentroCustoRepository';
import { Console } from 'console';

export class CentroCustoUseCase {
  constructor(
    private CentroCustoRepository: DbCentroCustoRepository) {
      CentroCustoRepository = CentroCustoRepository;
  }

  public async createCentroCusto(
    descricao: string,
    data: CreateCentroCustoDTO
  ): Promise<ICentroCusto | null> {

    const existsCentroCustoByDescricao = await this.CentroCustoRepository.getByDescricao(
      descricao
    );

    if (existsCentroCustoByDescricao) {
      throw new CentroCustoAlreadyExists();
    }

    const CentroCusto = await this.CentroCustoRepository.createCentroCusto({
      descricao: data.descricao,
      situacao: data.situacao
    });

    return CentroCusto;
  }

  public async getAll(): Promise<ICentroCusto[] | null> {
    const CentroCusto = await this.CentroCustoRepository.getAll();

    // if (!CentroCusto || CentroCusto.length === 0) {
    //   throw new CentroCustoNotFound();
    // }

    return CentroCusto;
  }

  public async getById(id: number): Promise<ICentroCusto | null> {
    const CentroCusto = await this.CentroCustoRepository.getById(id);

    if (!CentroCusto) {
      throw new CentroCustoNotFound();
    }

    return CentroCusto;
  }

  public async update(
    id: number, 
    data: UpdateCentroCustoDTO
    ): Promise<ICentroCusto | null> {
    const existsCentroCusto = await this.getById(id);

    if (!existsCentroCusto) {
      throw new CentroCustoNotFound();
    }

    const CentroCusto = await this.CentroCustoRepository.update(id, {
      descricao: data.descricao,
      situacao: data.situacao,
    });

    return CentroCusto;
  }

  public async delete(id: number): Promise<ICentroCusto | null> {
    const existsCentroCusto = await this.getById(id);

    if (!existsCentroCusto) {
      throw new CentroCustoNotFound();
    }

    const CentroCusto = await this.CentroCustoRepository.delete(id);

    return CentroCusto;
  }
  
}
