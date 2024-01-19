import { CreateMenuDTO, IMenu, UpdateMenuDTO } from '../interfaces/Menu.interface';
import { prismaClient } from '../database/prisma';
import { Menu } from '../entities/Menu';
import { MenuRepository } from './MenuRepository';

export class DbMenuRepository implements MenuRepository {
  
  public async createMenu(data: CreateMenuDTO): Promise<IMenu> {
    const menu = await prismaClient.menu.create({
      data: data,
      select: {
        id: true,
        grupo_id: true,
        descricao: true,
        rota: true,
        ativo: true
      },
    });

    return menu;
  }

  public async getAll(): Promise<IMenu[] | null> {
    return await prismaClient.menu.findMany({
      select: {
        id: true,
        ordem: true,
        grupo_id: true,
        descricao: true,
        rota: true,
        ativo: true
      },
      where: {
        ativo: {
          equals: 'S'
        }
      },
      orderBy: {
        ordem: 'asc',
      },
    });
  }

  public async getById(id: number): Promise<IMenu | null> {
    return await prismaClient.menu.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        grupo_id: true,
        descricao: true,
        rota: true,
        ativo: true,
      },
    });
  }

  public async getByDescricao(descricao: string): Promise<Menu | null> {
    return await prismaClient.menu.findUnique({
      where: {
        descricao,
      },
    });
  }

  public async update(id: number, data: UpdateMenuDTO): Promise<IMenu | null> {
    const menu = await prismaClient.menu.update({
      where: { id },
      data: data,
      select: { 
        id: true,
        grupo_id: true,
        descricao: true,
        rota: true,
        ativo: true
      }
    });

    return menu;
  }

  public async delete(id: number): Promise<IMenu | null> {
    return await prismaClient.menu.delete({
      where: { id },
    });
  }

}