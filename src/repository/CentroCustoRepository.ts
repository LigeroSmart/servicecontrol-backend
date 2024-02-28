import { CreateCentroCustoDTO, ICentroCusto } from '../interfaces/CentroCusto.interface';

export interface CentroCustoRepository {
  createCentroCusto(data: CreateCentroCustoDTO): Promise<ICentroCusto | null>;
  getAll(): Promise<ICentroCusto[] | null>;
  getById(id: number): Promise<ICentroCusto | null>;
  update(id: number, data: ICentroCusto): Promise<ICentroCusto | null>;
  delete(id: number): Promise<ICentroCusto | null>;
}