import { CreateContratoDTO, IContrato, UpdateContratoDTO } from '../interfaces/Contrato.interface';
import { prismaClient } from '../database/prisma';
import { Contrato } from '../entities/Contrato';
import { ContratoRepository } from './ContratoRepository';

export class DbContratoRepository implements ContratoRepository {
  
  public async createContrato(data: CreateContratoDTO): Promise<IContrato> {
    const contrato = await prismaClient.contrato.create({
      data: data,
      select: {
        id: true,
        cliente_id: true,
        tipo_contrato_id: true,
        centro_custo_id: true,
        numero: true,
        descricao: true,
        inicio_vigencia: true,
        termino_vigencia: true,
        termino_contrato: true,
        valor_mensal: true,
        situacao: true
      },
    });

    return contrato;
  }

  public async getAll(): Promise<IContrato[] | null> {
    return await prismaClient.contrato.findMany({
      select: {
        id: true,
        cliente_id: true,
        tipo_contrato_id: true,
        centro_custo_id: true,
        numero: true,
        descricao: true,
        inicio_vigencia: true,
        termino_vigencia: true,
        termino_contrato: true,
        valor_mensal: true,
        situacao: true
      },
      orderBy: {
        numero: 'asc',
      },
    });
  }

  public async getById(id: number): Promise<IContrato | null> {
    return await prismaClient.contrato.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        cliente_id: true,
        tipo_contrato_id: true,
        centro_custo_id: true,
        numero: true,
        descricao: true,
        inicio_vigencia: true,
        termino_vigencia: true,
        termino_contrato: true,
        valor_mensal: true,
        situacao: true
      },
    });
  }

  public async getByNumero(numero: string): Promise<IContrato | null> {
    return await prismaClient.contrato.findUnique({
      where: {
        numero,
      },
      select: {
        id: true,
        cliente_id: true,
        tipo_contrato_id: true,
        centro_custo_id: true,
        numero: true,
        descricao: true,
        inicio_vigencia: true,
        termino_vigencia: true,
        termino_contrato: true,
        valor_mensal: true,
        situacao: true
      },
    });
  }
  
  public async update(id: number, data: UpdateContratoDTO): Promise<IContrato | null> {
    const contrato = await prismaClient.contrato.update({
      where: { id },
      data: data,
      select: { 
        id: true,
        cliente_id: true,
        tipo_contrato_id: true,
        centro_custo_id: true,
        numero: true,
        descricao: true,
        inicio_vigencia: true,
        termino_vigencia: true,
        termino_contrato: true,
        valor_mensal: true,
        situacao: true
      }
    });

    return contrato;
  }

  public async delete(id: number): Promise<IContrato | null> {
    return await prismaClient.contrato.delete({
      where: { id },
    });
  }

}