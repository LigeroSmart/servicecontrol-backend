import { CreateRegraCobrancaTipoChamadoDTO, IRegraCobrancaTipoChamado, UpdateRegraCobrancaTipoChamadoDTO } from '../interfaces/RegraCobrancaTipoChamado.interface';
import { prismaClient } from '../database/prisma';
import { RegraCobrancaTipoChamado } from '../entities/RegraCobrancaTipoChamado';
import { RegraCobrancaTipoChamadoRepository } from './RegraCobrancaTipoChamadoRepository';

export class DbRegraCobrancaTipoChamadoRepository implements RegraCobrancaTipoChamadoRepository {
  
  public async createRegraCobrancaTipoChamado(data: CreateRegraCobrancaTipoChamadoDTO): Promise<IRegraCobrancaTipoChamado> {
    
    const RegraCobrancaTipoChamado = await prismaClient.regra_cobranca_tipo_chamado.create({
      data: data,
      select: {
        id: true,
        regra_cobranca_id: true,
        tipo_chamado_id: true
      },
    });

    return RegraCobrancaTipoChamado;
  }

  public async getAll(contrato_cobranca_id: number): Promise<IRegraCobrancaTipoChamado[] | null> {
    return await prismaClient.regra_cobranca_tipo_chamado.findMany({
      where: {
        regra_cobranca_id,
      },
      select: {
        id: true,
        regra_cobranca_id: true,
        tipo_chamado_id: true
      },
    });
  }

  public async getById(id: number): Promise<IRegraCobrancaTipoChamado | null> {
    return await prismaClient.regra_cobranca_tipo_chamado.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        regra_cobranca_id: true,
        tipo_chamado_id: true
      },
    });
  }

  public async update(id: number, data: UpdateRegraCobrancaTipoChamadoDTO): Promise<IRegraCobrancaTipoChamado | null> {
    return await prismaClient.regra_cobranca_tipo_chamado.update({
      where: { id },
      data: data,
      select: { 
        id: true,
        regra_cobranca_id: true,
        tipo_chamado_id: true
      }
    });
  }

  public async delete(id: number): Promise<IRegraCobrancaTipoChamado | null> {
    return await prismaClient.regra_cobranca_tipo_chamado.delete({
      where: { id },
    });
  }


  public async deleteContratoCobranca(regra_cobranca_id: number): Promise<IRegraCobrancaTipoChamado | null> {
    return await prismaClient.regra_cobranca_tipo_chamado.deleteMany({
      where: { 
        regra_cobranca_id: {
          equals: regra_cobranca_id
        }
      },
    });    
  }


}