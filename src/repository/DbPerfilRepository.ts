import { CreatePerfilDTO, IPerfil, UpdatePerfilDTO } from '../interfaces/Perfil.interface';
import { prismaClient } from '../database/prisma';
import { Perfil } from '../entities/Perfil';
import { PerfilRepository } from './PerfilRespository';

export class DbPerfilRepository implements PerfilRepository {
  
  public async createPerfil(data: CreatePerfilDTO): Promise<IPerfil> {
    const perfil = await prismaClient.perfil.create({
      data: data,
      select: {
        id: true,
        descricao: true,
        situacao: true
      },
    });

    return perfil;
  }

  public async getAll(): Promise<IPerfil[] | null> {
    return await prismaClient.perfil.findMany({
      select: {
        id: true,
        descricao: true,
        situacao: true
      },
      orderBy: {
        descricao: 'asc'
      }
    });
  }

  public async getById(id: number): Promise<IPerfil | null> {
    return await prismaClient.perfil.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        descricao: true,
        situacao: true,
        perfil_menu: {
          select: {
            id: true,
            perfil_id: true,
            menu_id: true,
          }
        }
      },
    });
  }

  public async getPerfilId(id: number): Promise<IPerfil | null> {
    return await prismaClient.$queryRaw`select p.id, P.descricao, p.situacao, m.descricao menu, m.rota, m.ordem, m.grupo_id, m.id menu_id from perfil p left outer join perfil_menu pm on p.id = pm.perfil_id left outer join menu m on pm.menu_id = m.id where p.id = ${id} order by m.ordem`;
  }

  public async getByUK(descricao: string): Promise<IPerfil | null> {
    return await prismaClient.perfil.findUnique({
      where: {
        descricao
      }
    });
  }

  public async getByDescricao(descricao: string): Promise<Perfil | null> {
    return await prismaClient.perfil.findMany({
      where: {
         descricao: {
          contains: 
            descricao          
         }      
      },
      orderBy: {
        descricao: 'asc'
      }
    });
  }

  public async update(id: number, data: UpdatePerfilDTO): Promise<IPerfil | null> {
    const perfil = await prismaClient.perfil.update({
      where: { id },
      data: data,
      select: { 
        id: true,
        descricao: true,
        situacao: true
      }
    });

    return perfil;
  }

  public async delete(id: number): Promise<IPerfil | null> {

    let perfilId = id;

    const perfilMenu = await prismaClient.perfil_menu.deleteMany({
      where: { 
        perfil_id : {
          equals: perfilId,
        },
      },
    });

    return await prismaClient.perfil.delete({
      where: { id },
    });
  }

}