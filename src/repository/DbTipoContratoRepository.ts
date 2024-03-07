import { CreateTipoContratoDTO, ITipoContrato, UpdateTipoContratoDTO } from '../interfaces/TipoContrato.interface';
import { prismaClient } from '../database/prisma';
import { TipoContrato } from '../entities/TipoContrato';
import { TipoContratoRepository } from './TipoContratoRepository';

export class DbTipoContratoRepository implements TipoContratoRepository {
  
  public async createTipoContrato(data: CreateTipoContratoDTO): Promise<ITipoContrato> {
    const tipoContrato = await prismaClient.tipo_contrato.create({
      data: data,
      select: {
        id: true,
        descricao: true,
        cobranca_unica: true,
        situacao: true
      },
    });

    return tipoContrato;
  }

  public async getAll(): Promise<ITipoContrato[] | null> {
    return await prismaClient.tipo_contrato.findMany({
      select: {
        id: true,
        descricao: true,
        cobranca_unica: true,
        situacao: true
      },
      orderBy: {
        descricao: 'asc',
      },
    });
  }

  public async getById(id: number): Promise<ITipoContrato | null> {
    return await prismaClient.tipo_contrato.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        descricao: true,
        cobranca_unica: true,
        situacao: true,
      },
    });
  }

  public async getByCodigo(codigo: string): Promise<ITipoContrato | null> {
    return await prismaClient.tipo_contrato.findUnique({
      where: {
        codigo,
      },
    });
  }

  public async update(id: number, data: UpdateTipoContratoDTO): Promise<ITipoContrato | null> {
    const tipoContrato = await prismaClient.tipo_contrato.update({
      where: { id },
      data: data,
      select: { 
        id: true,
        descricao: true,
        cobranca_unica: true,
        situacao: true
      }
    });

    return tipoContrato;
  }

  public async delete(id: number): Promise<ITipoContrato | null> {
    return await prismaClient.tipo_contrato.delete({
      where: { id },
    });
  }

}