import { CreateTipoAtividadeDTO, ITipoAtividade, UpdateTipoAtividadeDTO } from '../interfaces/TipoAtividade.interface';
import { prismaClient } from '../database/prisma';
import { TipoAtividade } from '../entities/TipoAtividade';
import { TipoAtividadeRepository } from './TipoAtividadeRepository';

export class DbTipoAtividadeRepository implements TipoAtividadeRepository {
  
  public async createTipoAtividade(data: CreateTipoAtividadeDTO): Promise<ITipoAtividade> {
    const TipoAtividade = await prismaClient.tipo_atividade.create({
      data: data,
      select: {
        id: true,
        descricao: true,
        situacao: true
      },
    });

    return TipoAtividade;
  }

  public async getAll(): Promise<ITipoAtividade[] | null> {
    return await prismaClient.tipo_atividade.findMany({
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

  public async getById(id: number): Promise<ITipoAtividade | null> {
    return await prismaClient.tipo_atividade.findUnique({
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

  public async getByDescricao(descricao: string): Promise<ITipoAtividade | null> {
    return await prismaClient.tipo_atividade.findUnique({
      where: {
        descricao,
      },
    });
  }

  public async update(id: number, data: UpdateTipoAtividadeDTO): Promise<ITipoAtividade | null> {
    const TipoAtividade = await prismaClient.tipo_atividade.update({
      where: { id },
      data: data,
      select: { 
        id: true,
        descricao: true,
        situacao: true
      }
    });

    return TipoAtividade;
  }

  public async delete(id: number): Promise<ITipoAtividade | null> {
    return await prismaClient.tipo_atividade.delete({
      where: { id },
    });
  }

}