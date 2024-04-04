import { CreateTipoChamadoDTO, ITipoChamado, UpdateTipoChamadoDTO } from '../interfaces/TipoChamado.interface';
import { prismaClient } from '../database/prisma';
import { TipoChamado } from '../entities/TipoChamado';
import { TipoChamadoRepository } from './TipoChamadoRepository';

export class DbTipoChamadoRepository implements TipoChamadoRepository {
  
  public async createTipoChamado(data: CreateTipoChamadoDTO): Promise<ITipoChamado> {
    const tipoChamado = await prismaClient.tipo_chamado.create({
      data: data,
      select: {
        id: true,
        descricao: true,
        situacao: true
      },
    });

    return tipoChamado;
  }

  public async getAll(): Promise<ITipoChamado[] | null> {
    return await prismaClient.tipo_chamado.findMany({
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

  public async getById(id: number): Promise<ITipoChamado | null> {
    return await prismaClient.tipo_chamado.findUnique({
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

  public async getByDescricao(descricao: string): Promise<ITipoChamado | null> {
    return await prismaClient.tipo_chamado.findUnique({
      where: {
        descricao,
      },
    });
  }

  public async update(id: number, data: UpdateTipoChamadoDTO): Promise<ITipoChamado | null> {
    const tipoChamado = await prismaClient.tipo_chamado.update({
      where: { id },
      data: data,
      select: { 
        id: true,
        descricao: true,
        situacao: true
      }
    });

    return tipoChamado;
  }

  public async delete(id: number): Promise<ITipoChamado | null> {
    return await prismaClient.tipo_chamado.delete({
      where: { id },
    });
  }

}