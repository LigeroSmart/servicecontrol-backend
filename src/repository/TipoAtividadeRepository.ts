import { CreateTipoAtividadeDTO, ITipoAtividade } from '../interfaces/TipoAtividade.interface';

export interface TipoAtividadeRepository {
  createTipoAtividade(data: CreateTipoAtividadeDTO): Promise<ITipoAtividade | null>;
  getAll(): Promise<ITipoAtividade[] | null>;
  getById(id: number): Promise<ITipoAtividade | null>;
  update(id: number, data: ITipoAtividade): Promise<ITipoAtividade | null>;
  delete(id: number): Promise<ITipoAtividade | null>;
}