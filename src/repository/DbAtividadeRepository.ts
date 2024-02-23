import { CreateAtividadeDTO, IAtividade, UpdateAtividadeDTO } from '../interfaces/Atividade.interface';
import { prismaClient } from '../database/prisma';
import { Atividade } from '../entities/Atividade';
import { AtividadeRepository } from './AtividadeRepository';

export class DbAtividadeRepository implements AtividadeRepository {
  
  public async createAtividade(data: CreateAtividadeDTO): Promise<IAtividade> {
    const atividade = await prismaClient.atividade.create({
      data: data,
      select: {
        id: true,
        usuario_id: true,
        tipo_atividade_id: true,
        ticket: true,
        codigo: true,
        data_inicio: true,
        hora_inicio: true,
        data_final: true,
        hora_final: true,
        assunto: true,
        descricao: true
      },
    });

    return atividade;
  }

  public async getAll(): Promise<IAtividade[] | null> {
    return await prismaClient.atividade.findMany({
      select: {
        id: true,
        usuario_id: true,
        tipo_atividade_id: true,
        ticket: true,
        codigo: true,
        data_inicio: true,
        hora_inicio: true,
        data_final: true,
        hora_final: true,
        assunto: true,
        descricao: true
      },
      orderBy: {
        ticket: 'asc',
      },
    });
  }

  public async getById(id: number): Promise<IAtividade | null> {
    return await prismaClient.atividade.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        usuario_id: true,
        tipo_atividade_id: true,
        ticket: true,
        codigo: true,
        data_inicio: true,
        hora_inicio: true,
        data_final: true,
        hora_final: true,
        assunto: true,
        descricao: true
      },
    });
  }
  
  public async getByUK(ticket: string): Promise<IAtividade | null> {
    return await prismaClient.atividade.findUnique({
      where: {
        ticket,
      },
      select: {
        id: true,
        usuario_id: true,
        tipo_atividade_id: true,
        ticket: true,
        codigo: true,
        data_inicio: true,
        hora_inicio: true,
        data_final: true,
        hora_final: true,
        assunto: true,
        descricao: true
      },
    });
  }

  public async getByTicket(ticket: string): Promise<IAtividade | null> {
    return await prismaClient.atividade.findMany({
      where: {
        ticket: {
          contains: ticket
        }
      },
      select: {
        id: true,
        usuario_id: true,
        tipo_atividade_id: true,
        ticket: true,
        codigo: true,
        data_inicio: true,
        hora_inicio: true,
        data_final: true,
        hora_final: true,
        assunto: true,
        descricao: true
      },
    });
  }

  public async update(id: number, data: UpdateAtividadeDTO): Promise<IAtividade | null> {
    const atividade = await prismaClient.atividade.update({
      where: { id },
      data: data,
      select: { 
        id: true,
        usuario_id: true,
        tipo_atividade_id: true,
        ticket: true,
        codigo: true,
        data_inicio: true,
        hora_inicio: true,
        data_final: true,
        hora_final: true,
        assunto: true,
        descricao: true
      }
    });

    return atividade;
  }

  public async delete(id: number): Promise<IAtividade | null> {
    return await prismaClient.atividade.delete({
      where: { id },
    });
  }

}