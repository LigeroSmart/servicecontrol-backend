import { CreateTipoHorarioDTO, ITipoHorario, UpdateTipoHorarioDTO } from '../interfaces/TipoHorario.interface';
import { prismaClient } from '../database/prisma';
import { TipoHorario } from '../entities/TipoHorario';
import { TipoHorarioRepository } from './TipoHorarioRepository';

export class DbTipoHorarioRepository implements TipoHorarioRepository {
  
  public async createTipoHorario(data: CreateTipoHorarioDTO): Promise<ITipoHorario> {
    const TipoHorario = await prismaClient.tipo_horario.create({
      data: data,
      select: {
        id: true,
        descricao: true,
        situacao: true
      },
    });

    return TipoHorario;
  }

  public async getAll(): Promise<ITipoHorario[] | null> {
    return await prismaClient.tipo_horario.findMany({
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

  public async getById(id: number): Promise<ITipoHorario | null> {
    return await prismaClient.tipo_horario.findUnique({
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

  public async getByDescricao(descricao: string): Promise<ITipoHorario | null> {
    return await prismaClient.tipo_horario.findUnique({
      where: {
        descricao,
      },
    });
  }

  public async update(id: number, data: UpdateTipoHorarioDTO): Promise<ITipoHorario | null> {
    const TipoHorario = await prismaClient.tipo_horario.update({
      where: { id },
      data: data,
      select: { 
        id: true,
        descricao: true,
        situacao: true
      }
    });

    return TipoHorario;
  }

  public async delete(id: number): Promise<ITipoHorario | null> {
    return await prismaClient.tipo_horario.delete({
      where: { id },
    });
  }

}