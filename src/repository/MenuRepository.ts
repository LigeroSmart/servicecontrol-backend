import { CreateMenuDTO, IMenu } from '../interfaces/Menu.interface';

export interface MenuRepository {
  createMenu(data: CreateMenuDTO): Promise<IMenu | null>;
  getAll(): Promise<IMenu[] | null>;
  getById(id: number): Promise<IMenu | null>;
  update(id: number, data: IMenu): Promise<IMenu | null>;
  delete(id: number): Promise<IMenu | null>;
}