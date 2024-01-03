import { IUsuario } from '../interfaces/Usuario.Interface';

export interface UsuarioRepository {
  createUsuario(data: IUsuario): Promise<IUsuario | null>;
  getAll(): Promise<IUsuario[] | null>;
  getById(id: number): Promise<IUsuario | null>;
  update(id: number, data: IUsuario): Promise<IUsuario | null>;
  delete(id: number): Promise<IUsuario | null>;
  validationUsuario(id: number): Promise<IUsuario | null>;
}