import { CreateCentroCustoDTO, ICentroCusto, UpdateCentroCustoDTO } from '../interfaces/CentroCusto.interface';
import { prismaClient } from '../database/prisma';
import { CentroCusto } from '../entities/CentroCusto';
import { CentroCustoRepository } from './CentroCustoRepository';

export class DbCentroCustoRepository implements CentroCustoRepository {
  
  public async createCentroCusto(data: CreateCentroCustoDTO): Promise<ICentroCusto> {
    const CentroCusto = await prismaClient.centro_custo.create({
      data: data,
      select: {
        id: true,
        descricao: true,
        situacao: true
      },
    });

    return CentroCusto;
  }

  public async getAll(): Promise<ICentroCusto[] | null> {
    return await prismaClient.centro_custo.findMany({
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

  public async getById(id: number): Promise<ICentroCusto | null> {
    return await prismaClient.centro_custo.findUnique({
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

  public async getByDescricao(descricao: string): Promise<ICentroCusto | null> {
    return await prismaClient.centro_custo.findUnique({
      where: {
        descricao,
      },
    });
  }

  public async update(id: number, data: UpdateCentroCustoDTO): Promise<ICentroCusto | null> {
    const CentroCusto = await prismaClient.centro_custo.update({
      where: { id },
      data: data,
      select: { 
        id: true,
        descricao: true,
        situacao: true
      }
    });

    return CentroCusto;
  }

  public async delete(id: number): Promise<ICentroCusto | null> {
    return await prismaClient.centro_custo.delete({
      where: { id },
    });
  }

}