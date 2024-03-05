import { CreateModeloHorarioDTO, IModeloHorario, UpdateModeloHorarioDTO } from '../interfaces/ModeloHorario.interface';
import { prismaClient } from '../database/prisma';
import { ModeloHorario } from '../entities/ModeloHorario';
import { ModeloHorarioRepository } from './ModeloHorarioRepository';

export class DbModeloHorarioRepository implements ModeloHorarioRepository {
  
  public async createModeloHorario(data: CreateModeloHorarioDTO): Promise<IModeloHorario> {
    const modeloHorario = await prismaClient.modelo_horario.create({
      data: data,
      select: {
        id: true,
        descricao: true,
        situacao: true
      },
    });

    return modeloHorario;
  }

  public async getAll(): Promise<IModeloHorario[] | null> {
    return await prismaClient.modelo_horario.findMany({
      select: {
        id: true,
        descricao: true,
        situacao: true
      },
      orderBy: {
        descricao: 'asc',
      },
    });
  }

  public async getById(id: number): Promise<IModeloHorario | null> {
    return await prismaClient.modelo_horario.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        descricao: true,
        situacao: true,
      },
    });
  }

  public async getBySituacao(situacao: string): Promise<IModeloHorario | null> {
    return await prismaClient.modelo_horario.findMany({
      where: {
        situacao,
      },
    });
  }

  public async getByDescricao(descricao: string): Promise<IModeloHorario | null> {
    return await prismaClient.modelo_horario.findUnique({
      where: {
        descricao,
      },
    });
  }

  public async update(id: number, data: UpdateModeloHorarioDTO): Promise<IModeloHorario | null> {
    const modeloHorario = await prismaClient.modelo_horario.update({
      where: { id },
      data: data,
      select: { 
        id: true,
        descricao: true,
        situacao: true
      }
    });

    return modeloHorario;
  }

  public async delete(id: number): Promise<IModeloHorario | null> {
    return await prismaClient.modelo_horario.delete({
      where: { id },
    });
  }

}