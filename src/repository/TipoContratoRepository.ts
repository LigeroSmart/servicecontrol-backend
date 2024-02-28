import { CreateTipoContratoDTO, ITipoContrato } from '../interfaces/TipoContrato.interface';

export interface TipoContratoRepository {
  createTipoContrato(data: CreateTipoContratoDTO): Promise<ITipoContrato | null>;
  getAll(): Promise<ITipoContrato[] | null>;
  getById(id: number): Promise<ITipoContrato | null>;
  update(id: number, data: ITipoContrato): Promise<ITipoContrato | null>;
  delete(id: number): Promise<ITipoContrato | null>;
}