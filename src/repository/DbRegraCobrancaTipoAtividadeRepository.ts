import { CreateRegraCobrancaTipoAtividadeDTO, IRegraCobrancaTipoAtividade, UpdateRegraCobrancaTipoAtividadeDTO } from '../interfaces/RegraCobrancaTipoAtividade.interface';
import { prismaClient } from '../database/prisma';
import { RegraCobrancaTipoAtividade } from '../entities/RegraCobrancaTipoAtividade';
import { RegraCobrancaTipoAtividadeRepository } from './RegraCobrancaTipoAtividadeRepository';

export class DbRegraCobrancaTipoAtividadeRepository implements RegraCobrancaTipoAtividadeRepository {
  
  public async createRegraCobrancaTipoAtividade(data: CreateRegraCobrancaTipoAtividadeDTO): Promise<IRegraCobrancaTipoAtividade> {
    
    const RegraCobrancaTipoAtividade = await prismaClient.regra_cobranca_tipo_atividade.create({
      data: data,
      select: {
        id: true,
        regra_cobranca_id: true,
        tipo_atividade_id: true
      },
    });

    return RegraCobrancaTipoAtividade;
  }

  public async getAll(contrato_cobranca_id: number): Promise<IRegraCobrancaTipoAtividade[] | null> {
    return await prismaClient.regra_cobranca_tipo_atividade.findMany({
      where: {
        regra_cobranca_id,
      },
      select: {
        id: true,
        regra_cobranca_id: true,
        tipo_atividade_id: true
      },
    });
  }

  public async getById(id: number): Promise<IRegraCobrancaTipoAtividade | null> {
    return await prismaClient.regra_cobranca_tipo_atividade.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        regra_cobranca_id: true,
        tipo_atividade_id: true
      },
    });
  }

  public async update(id: number, data: UpdateRegraCobrancaTipoAtividadeDTO): Promise<IRegraCobrancaTipoAtividade | null> {
    return await prismaClient.regra_cobranca_tipo_atividade.update({
      where: { id },
      data: data,
      select: { 
        id: true,
        regra_cobranca_id: true,
        tipo_atividade_id: true
      }
    });
  }

  public async delete(id: number): Promise<IRegraCobrancaTipoAtividade | null> {
    return await prismaClient.regra_cobranca_tipo_atividade.delete({
      where: { id },
    });
  }


  public async deleteContratoCobranca(regra_cobranca_id: number): Promise<IRegraCobrancaTipoAtividade | null> {
    return await prismaClient.regra_cobranca_tipo_atividade.deleteMany({
      where: { 
        regra_cobranca_id: {
          equals: regra_cobranca_id
        }
      },
    });    
  }


}