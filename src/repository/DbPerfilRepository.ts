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

  public async getByDescricao(descricao: string): Promise<Perfil | null> {
    return await prismaClient.perfil.findUnique({
      where: {
        descricao,
      },
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