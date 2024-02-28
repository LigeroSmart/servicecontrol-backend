import { CreateTipoContatoDTO, ITipoContato } from '../interfaces/TipoContato.interface';

export interface TipoContatoRepository {
  createTipoContato(data: CreateTipoContatoDTO): Promise<ITipoContato | null>;
  getAll(): Promise<ITipoContato[] | null>;
  getById(id: number): Promise<ITipoContato | null>;
  update(id: number, data: ITipoContato): Promise<ITipoContato | null>;
  delete(id: number): Promise<ITipoContato | null>;
}