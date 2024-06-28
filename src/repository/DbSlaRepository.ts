import { CreateSlaDTO, ISla, UpdateSlaDTO } from '../interfaces/SLA.interface';
import { prismaClient } from '../database/prisma';
import { Sla } from '../entities/Sla';
import { SlaRepository } from './SlaRepository';

export class DbSlaRepository implements SlaRepository {
  
  public async createSla(data: CreateSlaDTO): Promise<ISla> {
    const Sla = await prismaClient.sla.create({
      data: data,
      select: {
        id: true,
        descricao: true,
        situacao: true
      },
    });

    return Sla;
  }

  public async getAll(): Promise<ISla[] | null> {
    return await prismaClient.sla.findMany({
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

  public async getById(id: number): Promise<ISla | null> {
    return await prismaClient.sla.findUnique({
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

  public async getByDescricao(descricao: string): Promise<ISla | null> {
    return await prismaClient.sla.findUnique({
      where: {
        descricao,
      },
    });
  }

  public async update(id: number, data: UpdateSlaDTO): Promise<ISla | null> {
    const Sla = await prismaClient.sla.update({
      where: { id },
      data: data,
      select: { 
        id: true,
        descricao: true,
        situacao: true
      }
    });

    return Sla;
  }

  public async delete(id: number): Promise<ISla | null> {
    return await prismaClient.sla.delete({
      where: { id },
    });
  }

}