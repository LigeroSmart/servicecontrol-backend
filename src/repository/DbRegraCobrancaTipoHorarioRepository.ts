import { CreateRegraCobrancaTipoHorarioDTO, IRegraCobrancaTipoHorario, UpdateRegraCobrancaTipoHorarioDTO } from '../interfaces/RegraCobrancaTipoHorario.interface';
import { prismaClient } from '../database/prisma';
import { RegraCobrancaTipoHorario } from '../entities/RegraCobrancaTipoHorario';
import { RegraCobrancaTipoHorarioRepository } from './RegraCobrancaTipoHorarioRepository';

export class DbRegraCobrancaTipoHorarioRepository implements RegraCobrancaTipoHorarioRepository {
  
  public async createRegraCobrancaTipoHorario(data: CreateRegraCobrancaTipoHorarioDTO): Promise<IRegraCobrancaTipoHorario> {
    
    const RegraCobrancaTipoHorario = await prismaClient.regra_cobranca_horario.create({
      data: data,
      select: {
        id: true,
        regra_cobranca_id: true,
        tipo_horario_id: true
      },
    });

    return RegraCobrancaTipoHorario;
  }

  public async getAll(contrato_id: number): Promise<IRegraCobrancaTipoHorario[] | null> {
    return await prismaClient.regra_cobranca_horario.findMany({
      where: {
        regra_cobranca_id,
      },
      select: {
        id: true,
        regra_cobranca_id: true,
        tipo_horario_id: true
      },
    });
  }

  public async getById(id: number): Promise<IRegraCobrancaTipoHorario | null> {
    return await prismaClient.regra_cobranca_horario.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        regra_cobranca_id: true,
        tipo_horario_id: true
      },
    });
  }

  public async update(id: number, trx : any, data: UpdateRegraCobrancaTipoHorarioDTO): Promise<IRegraCobrancaTipoHorario | null> {
    //return await prismaClient.regra_cobranca_horario.update({
    return await trx.regra_cobranca_horario.update({
      where: { id },
      data: data,
      select: { 
        id: true,
        regra_cobranca_id: true,
        tipo_horario_id: true
      }
    });
  }

  public async delete(id: number): Promise<IRegraCobrancaTipoHorario | null> {
    return await prismaClient.regra_cobranca_horario.delete({
      where: { id },
    });
  }


  public async deleteContratoCobranca(regra_cobranca_id: number): Promise<IRegraCobrancaTipoHorario | null> {
    return await prismaClient.regra_cobranca_horario.deleteMany({
      where: { 
        regra_cobranca_id: {
          equals: regra_cobranca_id
        }
      },
    });    
  }


}