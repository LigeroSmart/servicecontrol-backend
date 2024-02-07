import { CreatePerfilMenuDTO, IPerfilMenu, UpdatePerfilMenuDTO } from '../interfaces/Perfil.Menu.interface';
import { prismaClient } from '../database/prisma';
import { PerfilMenu } from '../entities/Perfil.Menu';
import { PerfilMenuRepository } from './PerfilMenuRepository';

export class DbPerfilMenuRepository implements PerfilMenuRepository {
  
  public async createPerfilMenu(data: CreatePerfilMenuDTO): Promise<IPerfilMenu> {
    
    // console.log('CreatePerfilMenu',data.menu_id, data.perfil_id);

    const perfilMenu = await prismaClient.perfil_menu.create({
      data: data,
      select: {
        id: true,
        perfil_id: true,
        menu_id: true
      },
    });

    return perfilMenu;
  }

  public async getAll(): Promise<IPerfilMenu[] | null> {
    return await prismaClient.perfil_menu.findMany({
      select: {
        id: true,
        perfil_id: true,
        menu_id: true
      },
    });
  }

  public async getById(id: number): Promise<IPerfilMenu | null> {
    return await prismaClient.perfil_menu.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        perfil_id: true,
        menu_id: true
      },
    });
  }

  public async update(id: number, data: UpdatePerfilMenuDTO): Promise<IPerfilMenu | null> {
    // console.log('UpdatePerfilMenu',data.menu_id, data.perfil_id);

    return await prismaClient.perfil_menu.update({
      where: { id },
      data: data,
      select: { 
        id: true,
        perfil_id: true,
        menu_id: true
      }
    });
  }

  public async delete(id: number): Promise<IPerfilMenu | null> {
    return await prismaClient.perfil_menu.delete({
      where: { id },
    });
  }

  public async deletePerfil(perfilId: number): Promise<IPerfilMenu | null> {
    return await prismaClient.perfil_menu.deleteMany({
      where: { 
        perfil_id: {
          equals: perfilId
        }
      },
    });
  }

}