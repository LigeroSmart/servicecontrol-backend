import { CreateServicoClienteDTO, IServicoCliente, UpdateServicoClienteDTO } from '../interfaces/Servico.Cliente.interface';
import { prismaClient } from '../database/prisma';
import { ServicoCliente } from '../entities/Servico.Cliente';
import { ServicoClienteRepository } from './ServicoClienteRepository';

export class DbServicoClienteRepository implements ServicoClienteRepository {
  
  public async createServicoCliente(data: CreateServicoClienteDTO): Promise<IServicoCliente> {
    const servicoCliente = await prismaClient.servico_cliente.create({
      data: data,
      select: {
        id: true,
        cliente_id: true,
        servico_id: true
      },
    });

    return servicoCliente;
  }

  public async getAll(): Promise<IServicoCliente[] | null> {
    return await prismaClient.servico_cliente.findMany({
      select: {
        id: true,
        cliente_id: true,
        servico_id: true
      },
    });
  }

  public async getById(id: number): Promise<IServicoCliente | null> {
    return await prismaClient.servico_cliente.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        servico_id: true,
        cliente_id: true,
        cliente: {
          select: {
            nome_fantasia: true
          }
        },
        servico: {
          select: {
            descricao: true
          }
        }
      },
    });
  }

  public async getByUK(cliente_id: number, servico_id: number): Promise<IServicoCliente | null> {
    return await prismaClient.servico_cliente.findFirst({
      select: {
        id: true,
        cliente_id: true,
        servico_id: true
      },
      where: {
        cliente_id: {
          equals: cliente_id,
        },
        servico_id: {
          equals: servico_id,
        }
      }
    });
  }

  public async getByClienteId(cliente_id: number): Promise<IServicoCliente | null> {
    return await prismaClient.servico_cliente.findMany({
      select: {
        id: true,
        cliente_id: true,
        servico_id: true,
        servico: {
          select: {
            id: true,
            descricao: true,
            situacao: true
          },
          where:{
            situacao: {
              equals:"A"
            }
          }
        }
      },
      where: {
        cliente_id: {
          equals: cliente_id,
        }
      }
    });
  }

  public async update(id: number, data: UpdateServicoClienteDTO): Promise<IServicoCliente | null> {
    return await prismaClient.servico_cliente.update({
      where: { id },
      data: data,
      select: { 
        id: true,
        cliente_id: true,
        servico_id: true,        
      }
    });
  }

  public async delete(id: number): Promise<IServicoCliente | null> {
    return await prismaClient.servico_cliente.delete({
      where: { id },
    });
  }

}