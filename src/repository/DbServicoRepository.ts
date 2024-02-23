import { CreateServicoDTO, IServico, UpdateServicoDTO } from '../interfaces/servico.interface';
import { prismaClient } from '../database/prisma';
import { Servico } from '../entities/Servico';
import { ServicoRepository } from './ServicoRepository';

export class DbServicoRepository implements ServicoRepository {
  
  public async createServico(data: CreateServicoDTO): Promise<IServico> {
    const servico = await prismaClient.servico.create({
      data: data,
      select: {
        id: true,
        descricao: true,
        situacao: true
      },
    });

    return servico;
  }

  public async getAll(): Promise<IServico[] | null> {
    return await prismaClient.servico.findMany({
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

  public async getById(id: number): Promise<IServico | null> {
    return await prismaClient.servico.findUnique({
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

  public async getByUK(descricao: string): Promise<IServico | null> {
    return await prismaClient.servico.findUnique({
      where: {
        descricao
      }
    });
  }

  public async getByDescricao(descricao: string): Promise<IServico | null> {
    return await prismaClient.servico.findUnique({
      where: {
        descricao,
      },
    });
  }

  public async update(id: number, data: UpdateServicoDTO): Promise<IServico | null> {
    const servico = await prismaClient.servico.update({
      where: { id },
      data: data,
      select: { 
        id: true,
        descricao: true,
        situacao: true
      }
    });

    return servico;
  }

  public async delete(id: number): Promise<IServico | null> {
    return await prismaClient.servico.delete({
      where: { id },
    });
  }

}