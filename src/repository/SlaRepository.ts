import { CreateSlaDTO, ISla } from '../interfaces/SLA.interface';

export interface SlaRepository {
  createSla(data: CreateSlaDTO): Promise<ISla | null>;
  getAll(): Promise<ISla[] | null>;
  getById(id: number): Promise<ISla | null>;
  update(id: number, data: ISla): Promise<ISla | null>;
  delete(id: number): Promise<ISla | null>;
}