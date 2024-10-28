import { CreateClienteDTO, ICliente, UpdateClienteDTO } from '../interfaces/Cliente.interface';
import { prismaClient } from '../database/prisma';
import { Cliente } from '../entities/Cliente';
import { ClienteRepository } from './ClienteRepository';

export class DbClienteRepository implements ClienteRepository {
  
  public async createCliente(data: CreateClienteDTO): Promise<ICliente> {
    const cliente = await prismaClient.cliente.create({
      data: data,
      select: {
        id: true,
        modelo_horario_id: true,
        cliente_ligero_id: true,
        codigo: true,
        cnpj: true,
        ie: true,
        abreviacao: true,
        nome_fantasia: true,
        razao_social: true,
        cep: true,
        endereco: true,
        bairro: true,
        cidade: true,
        uf: true,
        site: true,
        observacao: true,
        situacao: true
      },
    });

    return cliente;
  }

  public async getAll(): Promise<ICliente[] | null> {
    return await prismaClient.cliente.findMany({
      select: {
        id: true,
        modelo_horario_id: true,
        cliente_ligero_id: true,
        codigo: true,
        cnpj: true,
        ie: true,
        abreviacao: true,
        nome_fantasia: true,
        razao_social: true,
        cep: true,
        endereco: true,
        bairro: true,
        cidade: true,
        uf: true,
        site: true,
        observacao: true,
        situacao: true
      },
      orderBy: {
        nome_fantasia: 'asc',
      },
    });
  }

  public async getById(id: number): Promise<ICliente | null> {
    return await prismaClient.cliente.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        modelo_horario_id: true,
        cliente_ligero_id: true,
        codigo: true,
        cnpj: true,
        ie: true,
        abreviacao: true,
        nome_fantasia: true,
        razao_social: true,
        cep: true,
        endereco: true,
        bairro: true,
        cidade: true,
        uf: true,
        site: true,
        observacao: true,
        situacao: true
      },
    });
  }

  public async getBySituacao(situacao: string): Promise<ICliente | null> {
    return await prismaClient.cliente.findMany({
      where: {
        situacao,
      },
    });
  }  
  
  public async getByCodigo(codigo: number): Promise<ICliente | null> {
    return await prismaClient.cliente.findUnique({
      where: {
        codigo,
      },
      select: {
        id: true,
        modelo_horario_id: true,
        cliente_ligero_id: true,
        codigo: true,
        cnpj: true,
        ie: true,
        abreviacao: true,
        nome_fantasia: true,
        razao_social: true,
        cep: true,
        endereco: true,
        bairro: true,
        cidade: true,
        uf: true,
        site: true,
        observacao: true,
        situacao: true
      },
    });
  }

  public async update(id: number, data: UpdateClienteDTO): Promise<ICliente | null> {
    const cliente = await prismaClient.cliente.update({
      where: { id },
      data: data,
      select: { 
        id: true,
        modelo_horario_id: true,
        cliente_ligero_id: true,
        codigo: true,
        cnpj: true,
        ie: true,
        abreviacao: true,
        nome_fantasia: true,
        razao_social: true,
        cep: true,
        endereco: true,
        bairro: true,
        cidade: true,
        uf: true,
        site: true,
        observacao: true,
        situacao: true
      }
    });

    return cliente;
  }

  public async delete(id: number): Promise<ICliente | null> {
    return await prismaClient.cliente.delete({
      where: { id },
    });
  }

}