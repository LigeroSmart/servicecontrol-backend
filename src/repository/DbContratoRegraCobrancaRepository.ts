import { CreateContratoRegraCobrancaDTO, IContratoRegraCobranca, UpdateContratoRegraCobrancaDTO } from '../interfaces/ContratoRegraCobranca.interface';
import { prismaClient } from '../database/prisma';
import { Prisma, PrismaClient } from '@prisma/client';
import { ContratoRegraCobranca } from '../entities/ContratoRegraCobranca';
import { ContratoRegraCobrancaRepository } from './ContratoRegraCobrancaRepository';

import { CreateRegraCobrancaTipoHorarioDTO, IRegraCobrancaTipoHorario, UpdateRegraCobrancaTipoHorarioDTO } from '../interfaces/RegraCobrancaTipoHorario.interface';

export class DbContratoRegraCobrancaRepository implements ContratoRegraCobrancaRepository {
  
  public async getTransacao():  Promise<any> {
    await prismaClient.$transaction(async (trx) => {
      return trx;
    })    
  }

  public async createContratoRegraCobranca(
    trx:Prisma.TransactionClient, 
    data: CreateContratoRegraCobrancaDTO,
    horario: [],
    servico: [],
    tipo_atividade: [],
    tipo_chamado: []
  ): Promise<IContratoRegraCobranca> {

    let contratoRegraCobranca;

    await prismaClient.$transaction(async (trx2) => {
      contratoRegraCobranca =  await trx2.regra_cobranca.create({
        data: data,
        select: {
          id: true,
          contrato_id: true,
          ordem: true,
          nome: true,
          valor: true,
          bloqueado: true
        },
      });

      const _id = contratoRegraCobranca.id;

      // #region CRUD horário    
      for (let i=0; i < horario.length; i++) {
        let horarioItem : any = horario[i];

        await trx2.regra_cobranca_horario.create({
          data: {
            regra_cobranca_id : _id,
            tipo_horario_id : horarioItem.tipo_horario_id,
          },
          select: {
            id: true,
            regra_cobranca_id: true,
            tipo_horario_id: true
          },
        });
      };
      // #endregion 
      
      // #region CRUD serviço
      for (let i=0; i < servico.length; i++) {
        let servicoItem : any = servico[i];

        await trx2.regra_cobranca_servico.create({
          data: {
            regra_cobranca_id : _id,
            servico_cliente_id : servicoItem.servico_cliente_id,
          },
          select: {
            id: true,
            regra_cobranca_id: true,
            servico_cliente_id: true
          },
        });
      };
      // #endregion      
      
      // #region CRUD tipo de atividade
      for (let i = 0; i < tipo_atividade.length; i++) {
        let tipoAtividadeItem : any = tipo_atividade[i];
   
        await trx2.regra_cobranca_tipo_atividade.create({
          data: {
            regra_cobranca_id : _id,
            tipo_atividade_id : tipoAtividadeItem.tipo_atividade_id,
          },
          select: {
            id: true,
            regra_cobranca_id: true,
            tipo_atividade_id: true
          },
        });
      };
      // #endregion

      // #region CRUD tipo de chamado
      for (let i = 0; i < tipo_chamado.length; i++) {
        let tipoChamadoItem : any = tipo_chamado[i];

        await trx2.regra_cobranca_tipo_chamado.create({
          data: {
            regra_cobranca_id : _id,
            tipo_chamado_id : tipoChamadoItem.tipo_chamado_id,
          },
          select: {
            id: true,
            regra_cobranca_id: true,
            tipo_chamado_id: true
          },
        });
      };
      // #endregion
      
    });

    return contratoRegraCobranca;
  }

  public async getAll(contrato_id: number): Promise<IContratoRegraCobranca[] | null> {
    return await prismaClient.regra_cobranca.findMany({
      where: {
        contrato_id,
      },
      select: {
        id: true,
        contrato_id: true,
        ordem: true,
        nome: true,
        valor: true,
        bloqueado: true
      },
    });
  }

  public async getById(id: number): Promise<IContratoRegraCobranca | null> {
    return await prismaClient.regra_cobranca.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        contrato_id: true,
        ordem: true,
        nome: true,
        valor: true,
        bloqueado: true,
        regra_cobranca_horario: {
          select:{
            id: true,
            regra_cobranca_id: true,
            tipo_horario_id: true
          }
        },
        regra_cobranca_servico: {
          select: {
            id: true,
            regra_cobranca_id: true,
            servico_cliente_id: true
          }
        },
        regra_cobranca_tipo_atividade: {
          select: {
            id: true,
            regra_cobranca_id: true,
            tipo_atividade_id: true
          }
        },
        regra_cobranca_tipo_chamado: {
          select: {
            id: true,
            regra_cobranca_id: true,
            tipo_chamado_id: true
          }
        }
      },
    });
  }

  public async update(
    id: number, 
    trx : any,
    data: UpdateContratoRegraCobrancaDTO,
    horario: [],
    servico: [],
    tipo_atividade: [],
    tipo_chamado: []
  ): Promise<IContratoRegraCobranca | null> {

    let retorno;

    await prismaClient.$transaction(async (trx2) => {
      retorno = await trx2.regra_cobranca.update({
        where: { id },
        data: data,
        select: { 
          id: true,
          contrato_id: true,
          ordem: true,
          nome: true,
          valor: true,
          bloqueado: true
        }
      });

      // #region CRUD horário    
      for (let i=0; i<horario.length; i++) {
        let horarioItem : any = horario[i];

        if (horarioItem.deleted) {
          await trx2.regra_cobranca_horario.delete({
            where: { 
              id : horarioItem.id
            },
          });
        } else {
          if (horarioItem.id > 0) {
            await trx2.regra_cobranca_horario.update({
              where: { 
                id : horarioItem.id 
              },
              data: {
                regra_cobranca_id : horarioItem.regra_cobranca_id,
                tipo_horario_id : horarioItem.tipo_horario_id,
              },
              select: { 
                id: true,
                regra_cobranca_id: true,
                tipo_horario_id: true
              }
            });            
          } 
          else {
            await trx2.regra_cobranca_horario.create({
              data: {
                regra_cobranca_id : horarioItem.regra_cobranca_id,
                tipo_horario_id : horarioItem.tipo_horario_id,
              },
              select: {
                id: true,
                regra_cobranca_id: true,
                tipo_horario_id: true
              },
            });
          }  
        }
      };
      // #endregion 
      
      // #region CRUD serviço
      for (let i=0; i < servico.length; i++) {
        let servicoItem : any = servico[i];

        if (servicoItem.deleted) {
          await trx2.regra_cobranca_servico.delete({
            where: { 
              id : servicoItem.id
            },
          });
        } else {
          if (servicoItem.id > 0) {
            await trx2.regra_cobranca_servico.update({
              where: { 
                id : servicoItem.id
              },
              data: {
                regra_cobranca_id : servicoItem.regra_cobranca_id,
                servico_cliente_id : servicoItem.servico_cliente_id,
              },
              select: { 
                id: true,
                regra_cobranca_id: true,
                servico_cliente_id: true
              }
            });
          } 
          else {
            await trx2.regra_cobranca_servico.create({
              data: {
                regra_cobranca_id : servicoItem.regra_cobranca_id,
                servico_cliente_id : servicoItem.servico_cliente_id,
              },
              select: {
                id: true,
                regra_cobranca_id: true,
                servico_cliente_id: true
              },
            });
          }  
        }
      };
      // #endregion      
      
      // #region CRUD tipo de atividade
      for (let i = 0; i < tipo_atividade.length; i++) {
        let tipoAtividadeItem : any = tipo_atividade[i];

        if (tipoAtividadeItem.deleted) {
          await trx2.regra_cobranca_tipo_atividade.delete({
            where: { 
              id : tipoAtividadeItem.id
            },
          });
        } else {
          if (tipoAtividadeItem.id > 0) {
            await trx2.regra_cobranca_tipo_atividade.update({
              where: { 
                id : tipoAtividadeItem.id
              },
              data: {
                regra_cobranca_id : tipoAtividadeItem.regra_cobranca_id,
                tipo_atividade_id : tipoAtividadeItem.tipo_atividade_id,
              },
              select: { 
                id: true,
                regra_cobranca_id: true,
                tipo_atividade_id: true
              }
            });
          } 
          else {
            await trx2.regra_cobranca_tipo_atividade.create({
              data: {
                regra_cobranca_id : tipoAtividadeItem.regra_cobranca_id,
                tipo_atividade_id : tipoAtividadeItem.tipo_atividade_id,
              },
              select: {
                id: true,
                regra_cobranca_id: true,
                tipo_atividade_id: true
              },
            });
          }  
        }
      };
      // #endregion

      // #region CRUD tipo de chamado
      //tipo_chamado.forEach(async tipoChamadoItem => {
      for (let i = 0; i < tipo_chamado.length; i++) {
        let tipoChamadoItem : any = tipo_chamado[i];

        if (tipoChamadoItem.deleted) {
          await trx2.regra_cobranca_tipo_chamado.delete({
            where: { 
              id : tipoChamadoItem.id
            },
          });
        } else {
          if (tipoChamadoItem.id > 0) {
            await trx2.regra_cobranca_tipo_chamado.update({
              where: { 
                id : tipoChamadoItem.id
              },
              data: {
                regra_cobranca_id : tipoChamadoItem.regra_cobranca_id,
                tipo_chamado_id : tipoChamadoItem.tipo_chamado_id,
              },
              select: { 
                id: true,
                regra_cobranca_id: true,
                tipo_chamado_id: true
              }
            });
          } 
          else {
            await trx2.regra_cobranca_tipo_chamado.create({
              data: {
                regra_cobranca_id : tipoChamadoItem.regra_cobranca_id,
                tipo_chamado_id : tipoChamadoItem.tipo_chamado_id,
              },
              select: {
                id: true,
                regra_cobranca_id: true,
                tipo_chamado_id: true
              },
            });
          }  
        }
      };
      // #endregion
      
    });

    return retorno;
  }

  public async delete(id: number): Promise<IContratoRegraCobranca | null> {
    return await prismaClient.regra_cobranca.delete({
      where: { id },
    });
  }

}