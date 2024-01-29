import { CreateModeloHorarioDTO, IModeloHorario } from '../interfaces/ModeloHorario.interface';

export interface ModeloHorarioRepository {
  createModeloHorario(data: CreateModeloHorarioDTO): Promise<IModeloHorario | null>;
  getAll(): Promise<IModeloHorario[] | null>;
  getById(id: number): Promise<IModeloHorario | null>;
  update(id: number, data: IModeloHorario): Promise<IModeloHorario | null>;
  delete(id: number): Promise<IModeloHorario | null>;
}