import { CreateTipoContatoDTO, ITipoContato, UpdateTipoContatoDTO } from '../interfaces/TipoContato.interface';
import { prismaClient } from '../database/prisma';
import { TipoContato } from '../entities/TipoContato';
import { TipoContatoRepository } from './TipoContatoRepository';

export class DbTipoContatoRepository implements TipoContatoRepository {
  
  public async createTipoContato(data: CreateTipoContatoDTO): Promise<ITipoContato> {
    const TipoContato = await prismaClient.tipo_contato.create({
      data: data,
      select: {
        id: true,
        descricao: true,
        situacao: true
      },
    });

    return TipoContato;
  }

  public async getAll(): Promise<ITipoContato[] | null> {
    return await prismaClient.tipo_contato.findMany({
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

  public async getById(id: number): Promise<ITipoContato | null> {
    return await prismaClient.tipo_contato.findUnique({
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

  public async getByDescricao(descricao: string): Promise<ITipoContato | null> {
    return await prismaClient.tipo_contato.findUnique({
      where: {
        descricao,
      },
    });
  }

  public async update(id: number, data: UpdateTipoContatoDTO): Promise<ITipoContato | null> {
    const TipoContato = await prismaClient.tipo_contato.update({
      where: { id },
      data: data,
      select: { 
        id: true,
        descricao: true,
        situacao: true
      }
    });

    return TipoContato;
  }

  public async delete(id: number): Promise<ITipoContato | null> {
    return await prismaClient.tipo_contato.delete({
      where: { id },
    });
  }

}