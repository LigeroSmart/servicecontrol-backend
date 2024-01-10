import { IPerfil } from '../interfaces/Perfil.interface';
import { CreatePerfilMenuDTO, IPerfilMenu } from '../interfaces/Perfil.Menu.interface';

export interface PerfilRepository {
  createPerfil(data: IPerfil, itens: CreatePerfilMenuDTO): Promise<IPerfil | null>;
  getAll(): Promise<IPerfil[] | null>;
  getById(id: number): Promise<IPerfil | null>;
  update(id: number, data: IPerfil): Promise<IPerfil | null>;
  delete(id: number): Promise<IPerfil | null>;
}