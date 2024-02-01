import { CreateTipoHorarioDTO, ITipoHorario } from '../interfaces/TipoHorario.interface';

export interface TipoHorarioRepository {
  createTipoHorario(data: CreateTipoHorarioDTO): Promise<ITipoHorario | null>;
  getAll(): Promise<ITipoHorario[] | null>;
  getById(id: number): Promise<ITipoHorario | null>;
  update(id: number, data: ITipoHorario): Promise<ITipoHorario | null>;
  delete(id: number): Promise<ITipoHorario | null>;
}