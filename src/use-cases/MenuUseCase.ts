import { MenuAlreadyExists } from '../errors/MenuAlreadyExists';
import { MenuNotFound } from '../errors/MenuNotFound';
import { CreateMenuDTO, IMenu, UpdateMenuDTO } from '../interfaces/Menu.interface';
import { DbMenuRepository } from '../repository/DbMenuRepository';
import { Console } from 'console';

export class MenuUseCase {
  constructor(
    private menuRepository: DbMenuRepository) {
      menuRepository = menuRepository;
  }

  public async createMenu(
    descricao: string,
    data: CreateMenuDTO
  ): Promise<IMenu | null> {

    // const existsMenuByDescricao = await this.menuRepository.getByDescricao(
    //   descricao
    // );

    // if (existsMenuByDescricao) {
    //   throw new MenuAlreadyExists();
    // }

    const menu = await this.menuRepository.createMenu({
      grupo_id: data.grupo_id,
      descricao: data.descricao,
      rota: data.descricao,
      ativo: data.ativo
    });

    return menu;
  }

  public async getAll(): Promise<IMenu[] | null> {
    const menu = await this.menuRepository.getAll();

    if (!menu || menu.length === 0) {
      throw new MenuNotFound();
    }

    return menu;
  }

  public async getById(id: number): Promise<IMenu | null> {
    const menu = await this.menuRepository.getById(id);

    if (!menu) {
      throw new MenuNotFound();
    }

    return menu;
  }

  public async update(
    id: number, 
    data: UpdateMenulDTO
    ): Promise<IMenu | null> {
    const existsMenu = await this.getById(id);

    if (!existsMenu) {
      throw new MenuNotFound();
    }

    const menu = await this.menuRepository.update(id, {
      grupo_id: data.grupo_id,
      descricao: data.descricao,
      rota: data.rota,
      ativo: data.ativo,
    });

    return menu;
  }

  public async delete(id: number): Promise<IMenu | null> {
    const existsMenu = await this.getById(id);

    if (!existsMenu) {
      throw new MenuNotFound();
    }

    const menu = await this.menuRepository.delete(id);

    return menu;
  }
  
}
