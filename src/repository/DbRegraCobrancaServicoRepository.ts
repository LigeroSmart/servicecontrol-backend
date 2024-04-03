import { CreateRegraCobrancaServicoDTO, IRegraCobrancaServico, UpdateRegraCobrancaServicoDTO } from '../interfaces/RegraCobrancaServico.interface';
import { prismaClient } from '../database/prisma';
import { RegraCobrancaServico } from '../entities/RegraCobrancaServico';
import { RegraCobrancaServicoRepository } from './RegraCobrancaServicoRepository';

export class DbRegraCobrancaServicoRepository implements RegraCobrancaServicoRepository {
  
  public async createRegraCobrancaServico(data: CreateRegraCobrancaServicoDTO): Promise<IRegraCobrancaServico> {
    
    const RegraCobrancaServico = await prismaClient.regra_cobranca_servico.create({
      data: data,
      select: {
        id: true,
        regra_cobranca_id: true,
        servico_cliente_id: true
      },
    });

    return RegraCobrancaServico;
  }

  public async getAll(contrato_cobranca_id: number): Promise<IRegraCobrancaServico[] | null> {
    return await prismaClient.regra_cobranca_servico.findMany({
      where: {
        regra_cobranca_id,
      },
      select: {
        id: true,
        regra_cobranca_id: true,
        servico_cliente_id: true
      },
    });
  }

  public async getById(id: number): Promise<IRegraCobrancaServico | null> {
    return await prismaClient.regra_cobranca_servico.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        regra_cobranca_id: true,
        servico_cliente_id: true
      },
    });
  }

  public async update(id: number, data: UpdateRegraCobrancaServicoDTO): Promise<IRegraCobrancaServico | null> {
    return await prismaClient.regra_cobranca_servico.update({
      where: { id },
      data: data,
      select: { 
        id: true,
        regra_cobranca_id: true,
        servico_cliente_id: true
      }
    });
  }

  public async delete(id: number): Promise<IRegraCobrancaServico | null> {
    return await prismaClient.regra_cobranca_servico.delete({
      where: { id },
    });
  }


  public async deleteContratoCobranca(regra_cobranca_id: number): Promise<IRegraCobrancaServico | null> {
    return await prismaClient.regra_cobranca_servico.deleteMany({
      where: { 
        regra_cobranca_id: {
          equals: regra_cobranca_id
        }
      },
    });    
  }


}