import { IPerfilMenu } from '../interfaces/Perfil.Menu.interface';

export interface PerfilMenuRepository {
  createPerfilMenu(data: IPerfilMenu): Promise<IPerfilMenu | null>;
  getAll(): Promise<IPerfilMenu[] | null>;
  getById(id: number): Promise<IPerfilMenu | null>;
  update(id: number, data: IPerfilMenu): Promise<IPerfilMenu | null>;
  delete(id: number): Promise<IPerfilMenu | null>;
  deletePerfil(perfilId: number): Promise<IPerfilMenu | null>;
}