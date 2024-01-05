import { CreateUsuarioDTO, IUsuario, UpdateUsuarioDTO } from '../interfaces/Usuario.Interface';
import { prismaClient } from '../database/prisma';
import { Usuario } from '../entities/Usuario';
import { UsuarioRepository } from './UsuarioRepository';

export class DbUsuarioRepository implements UsuarioRepository {
  
  public async createUsuario(data: CreateUsuarioDTO): Promise<IUsuario> {
    const user = await prismaClient.usuario.create({
      data: data,
      select: {
        id: true,
        perfil_id: true,
        nome: true,
        email: true,
        administrador: true,
        situacao: true
      },
    });

    return user;
  }

  public async getAll(): Promise<IUsuario[] | null> {
    return await prismaClient.usuario.findMany({
      select: {
        id: true,
        perfil_id: true,
        nome: true,
        email: true,
        administrador: true,
        situacao: true
      },
    });
  }

  public async getById(id: number): Promise<IUsuario | null> {
    return await prismaClient.usuario.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        perfil_id: true,
        nome: true,
        email: true,
        administrador: true,
        situacao: true
      },
    });
  }

  public async getByUsuario(email: string): Promise<Usuario | null> {
    return await prismaClient.usuario.findUnique({
      where: {
        email,
      },
    });
  }

  public async update(id: number, data: UpdateUsuarioDTO): Promise<IUsuario | null> {
    return await prismaClient.usuario.update({
      where: { id },
      data: data,
      select: { 
        id: true,
        perfil_id: true,
        nome: true,
        email: true,
        administrador: true,
        situacao: true
      }
    });
  }

  public async delete(id: number): Promise<IUsuario | null> {
    return await prismaClient.usuario.delete({
      where: { id },
    });
  }

  public async validationUsuario(id: number): Promise<IUsuario | null> {
    const user = await prismaClient.usuario.update({
      where: { id },
      data: {
        situacao: 'S',
      },
    });

    return user;
  }

  public async updatePassword(
    id: number,
    senha: string
  ): Promise<IUsuario | null> {
    return await prismaClient.usuario.update({
      where: { id },
      data: {
        senha: senha,
      },
      select: {
        id: true,
        perfil_id: true,
        nome: true,
        email: true,
        administrador: true,
        situacao: true,
      }
    });
  }
}