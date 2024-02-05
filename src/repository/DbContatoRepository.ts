import { CreateContatoDTO, IContato, UpdateContatoDTO } from '../interfaces/Contato.interface';
import { prismaClient } from '../database/prisma';
import { Contato } from '../entities/Contato';
import { ContatoRepository } from './ContatoRepository';

export class DbContatoRepository implements ContatoRepository {
  
  public async createContato(data: CreateContatoDTO): Promise<IContato> {
    const contato = await prismaClient.contato.create({
      data: data,
      select: {
        id: true,
        cliente_id: true,
        codigo: true,
        nome: true,
        telefone: true,
        ramal: true,
        celular: true,
        email: true,
        situacao: true
      },
    });

    return contato;
  }

  public async getAll(): Promise<IContato[] | null> {
    return await prismaClient.contato.findMany({
      select: {
        id: true,
        cliente_id: true,
        codigo: true,
        nome: true,
        telefone: true,
        ramal: true,
        celular: true,
        email: true,
        situacao: true
      },
      orderBy: {
        nome: 'asc',
      },
    });
  }

  public async getById(id: number): Promise<IContato | null> {
    return await prismaClient.contato.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        cliente_id: true,
        codigo: true,
        nome: true,
        telefone: true,
        ramal: true,
        celular: true,
        email: true,
        situacao: true
      },
    });
  }
  
  public async getByCodigo(codigo: string): Promise<IContato | null> {
    return await prismaClient.contato.findUnique({
      where: {
        codigo,
      },
      select: {
        id: true,
        cliente_id: true,
        codigo: true,
        nome: true,
        telefone: true,
        ramal: true,
        celular: true,
        email: true,
      },
    });
  }

  public async update(id: number, data: UpdateContatoDTO): Promise<IContato | null> {
    const contato = await prismaClient.contato.update({
      where: { id },
      data: data,
      select: { 
        id: true,
        cliente_id: true,
        codigo: true,
        nome: true,
        telefone: true,
        ramal: true,
        celular: true,
        email: true,
      }
    });

    return contato;
  }

  public async delete(id: number): Promise<IContato | null> {
    return await prismaClient.contato.delete({
      where: { id },
    });
  }

}