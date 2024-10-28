import { SlaAlreadyExists } from '../errors/SlaAlreadyExists';
import { SlaInativo } from '../errors/SlaInativo';
import { SlaNotFound } from '../errors/SlaNotFound';
import { CreateSlaDTO, ISla, UpdateSlaDTO } from '../interfaces/SLA.interface';
import { DbSlaRepository } from '../repository/DbSlaRepository';
import { Console } from 'console';

export class SlaUseCase {
  constructor(
    private SlaRepository: DbSlaRepository) {
      SlaRepository = SlaRepository;
  }

  public async createSla(
    descricao: string,
    data: CreateSlaDTO
  ): Promise<ISla | null> {

    const existsSlaByDescricao = await this.SlaRepository.getByDescricao(
      descricao
    );

    if (existsSlaByDescricao) {
      throw new SlaAlreadyExists();
    }

    const Sla = await this.SlaRepository.createSla({
      descricao: data.descricao,
      situacao: data.situacao,
      sla_ligero_id: data.sla_ligero_id
    });

    return Sla;
  }

  public async getAll(): Promise<ISla[] | null> {
    const Sla = await this.SlaRepository.getAll();

    // if (!Sla || Sla.length === 0) {
    //   throw new SlaNotFound();
    // }

    return Sla;
  }

  public async getById(id: number): Promise<ISla | null> {
    const Sla = await this.SlaRepository.getById(id);

    if (!Sla) {
      throw new SlaNotFound();
    }

    return Sla;
  }

  public async update(
    id: number, 
    data: UpdateSlaDTO
    ): Promise<ISla | null> {
    const existsSla = await this.getById(id);

    if (!existsSla) {
      throw new SlaNotFound();
    }

    const Sla = await this.SlaRepository.update(id, {
      descricao: data.descricao,
      situacao: data.situacao,
      sla_ligero_id: data.sla_ligero_id
    });

    return Sla;
  }

  public async delete(id: number): Promise<ISla | null> {
    const existsSla = await this.getById(id);

    if (!existsSla) {
      throw new SlaNotFound();
    }

    const Sla = await this.SlaRepository.delete(id);

    return Sla;
  }
  
}
