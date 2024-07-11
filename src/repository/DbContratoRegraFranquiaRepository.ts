import { CreateContratoRegraFranquiaDTO, IContratoRegraFranquia, UpdateContratoRegraFranquiaDTO } from '../interfaces/ContratoRegraFranquia.interface';
import { prismaClient } from '../database/prisma';
import { Prisma, PrismaClient } from '@prisma/client';
import { ContratoRegraFranquia } from '../entities/ContratoRegraFranquia';
import { ContratoRegraFranquiaRepository } from './ContratoRegraFranquiaRepository';

import { CreateRegraFranquiaTipoHorarioDTO, IRegraFranquiaTipoHorario, UpdateRegraFranquiaTipoHorarioDTO } from '../interfaces/RegraFranquiaTipoHorario.interface';

export class DbContratoRegraFranquiaRepository implements ContratoRegraFranquiaRepository {
  
  public async createContratoRegraFranquia(
    data: CreateContratoRegraFranquiaDTO,
    horario: [],
    servico: [],
    tipo_atividade: [],
    tipo_chamado: []
  ): Promise<IContratoRegraFranquia> {

    let contratoRegraFranquia;

    await prismaClient.$transaction(async (trx2) => {
      contratoRegraFranquia =  await trx2.regra_franquia.create({
        data: data,
        select: {
          id: true,
          contrato_id: true,
          qtd_horas: true,
          valor_hora: true,
          qtd_meses: true,
          franquia_fixa: true
        },
      });

      const _id = contratoRegraFranquia.id;

      // #region CRUD horário    
      for (let i=0; i < horario.length; i++) {
        let horarioItem : any = horario[i];

        console.log('horarioItem', horarioItem);

        await trx2.regra_franquia_horario.create({
          data: {
            regra_franquia_id : _id,
            tipo_horario_id: horarioItem.tipo_horario_id
          },
          select: {
            id: true,
            regra_franquia_id: true,
            tipo_horario_id: true
          },
        });
      };
      // #endregion 
      
      // #region CRUD serviço
      for (let i=0; i < servico.length; i++) {
        let servicoItem : any = servico[i];

        await trx2.regra_franquia_servico.create({
          data: {
            regra_franquia_id : _id,
            servico_cliente_id : servicoItem.servico_cliente_id,
          },
          select: {
            id: true,
            regra_franquia_id: true,
            servico_cliente_id: true
          },
        });
      };
      // #endregion      
      
      // #region CRUD tipo de atividade
      for (let i = 0; i < tipo_atividade.length; i++) {
        let tipoAtividadeItem : any = tipo_atividade[i];
   
        await trx2.regra_franquia_tipo_atividade.create({
          data: {
            regra_franquia_id : _id,
            tipo_atividade_id : tipoAtividadeItem.tipo_atividade_id,
          },
          select: {
            id: true,
            regra_franquia_id: true,
            tipo_atividade_id: true
          },
        });
      };
      // #endregion

      // #region CRUD tipo de chamado
      for (let i = 0; i < tipo_chamado.length; i++) {
        let tipoChamadoItem : any = tipo_chamado[i];

        await trx2.regra_franquia_tipo_chamado.create({
          data: {
            regra_franquia_id : _id,
            tipo_chamado_id : tipoChamadoItem.tipo_chamado_id,
          },
          select: {
            id: true,
            regra_franquia_id: true,
            tipo_chamado_id: true
          },
        });
      };
      // #endregion
      
    });

    return contratoRegraFranquia;
  }

  public async getAll(contrato_id: number): Promise<IContratoRegraFranquia[] | null> {
    return await prismaClient.regra_franquia.findMany({
      where: {
        contrato_id,
      },
      select: {
        id: true,
        contrato_id: true,
        qtd_horas: true,
        valor_hora: true,
        qtd_meses: true,
        franquia_fixa: true
      },
    });
  }

  public async getById(id: number): Promise<IContratoRegraFranquia | null> {
    return await prismaClient.regra_franquia.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        contrato_id: true,
        qtd_horas: true,
        valor_hora: true,
        qtd_meses: true,
        franquia_fixa: true,
        regra_franquia_horario: {
          select:{
            id: true,
            regra_franquia_id: true, 
            tipo_horario_id: true,   
            tipo_horario: {
              select: {
                descricao: true
              }
            }            
          }
        },
        regra_franquia_servico: {
          select: {
            id: true,
            regra_franquia_id: true,
            servico_cliente_id: true,
            servico_cliente: {
              select: {
                cliente_id: true,
                servico_id: true,
                cliente: {
                  select: {
                    codigo: true,
                    nome_fantasia: true
                  }
                },
                servico: {
                  select: {
                    descricao: true
                  }
                }
              }
            }
          }
        },
        regra_franquia_tipo_atividade: {
          select: {
            id: true,
            regra_franquia_id: true,
            tipo_atividade_id: true,
            tipo_atividade: {
              select:{
                descricao : true
              }
            }
          }
        },
        regra_franquia_tipo_chamado: {
          select: {
            id: true,
            regra_franquia_id: true,
            tipo_chamado_id: true,
            tipo_chamado: {
              select: {
                descricao: true
              }
            }
          }
        }
      },
    });
  }

  public async update(
    id: number, 
    data: UpdateContratoRegraFranquiaDTO,
    horario: [],
    servico: [],
    tipo_atividade: [],
    tipo_chamado: []
  ): Promise<IContratoRegraFranquia | null> {

    let retorno;

    await prismaClient.$transaction(async (trx2) => {
      retorno = await trx2.regra_franquia.update({
        where: { id },
        data: data,
        select: { 
          id: true,
          contrato_id: true,
          qtd_horas: true,
          valor_hora: true,
          qtd_meses: true,
          franquia_fixa: true
        }
      });

      // #region CRUD horário    
      for (let i=0; i<horario.length; i++) {
        let horarioItem : any = horario[i];

        if (horarioItem.deleted) {
          await trx2.regra_franquia_horario.delete({
            where: { 
              id : horarioItem.id
            },
          });
        } else {
          if (horarioItem.id > 0) {
            await trx2.regra_franquia_horario.update({
              where: { 
                id : horarioItem.id 
              },
              data: {
                regra_franquia_id : horarioItem.regra_franquia_id,
                modelo_horario_id : horarioItem.modelo_horario_id,
              },
              select: { 
                id: true,
                regra_franquia_id: true,
                modelo_horario_id: true
              }
            });            
          } 
          else {
            await trx2.regra_franquia_horario.create({
              data: {
                regra_franquia_id : horarioItem.regra_franquia_id,
                modelo_horario_id : horarioItem.modelo_horario_id,
              },
              select: {
                id: true,
                regra_franquia_id: true,
                modelo_horario_id: true
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
          await trx2.regra_franquia_servico.delete({
            where: { 
              id : servicoItem.id
            },
          });
        } else {
          if (servicoItem.id > 0) {
            await trx2.regra_franquia_servico.update({
              where: { 
                id : servicoItem.id
              },
              data: {
                regra_franquia_id : servicoItem.regra_franquia_id,
                servico_cliente_id : servicoItem.servico_cliente_id,
              },
              select: { 
                id: true,
                regra_franquia_id: true,
                servico_cliente_id: true
              }
            });
          } 
          else {
            await trx2.regra_franquia_servico.create({
              data: {
                regra_franquia_id : servicoItem.regra_franquia_id,
                servico_cliente_id : servicoItem.servico_cliente_id,
              },
              select: {
                id: true,
                regra_franquia_id: true,
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
          await trx2.regra_franquia_tipo_atividade.delete({
            where: { 
              id : tipoAtividadeItem.id
            },
          });
        } else {
          if (tipoAtividadeItem.id > 0) {
            await trx2.regra_franquia_tipo_atividade.update({
              where: { 
                id : tipoAtividadeItem.id
              },
              data: {
                regra_franquia_id : tipoAtividadeItem.regra_franquia_id,
                tipo_atividade_id : tipoAtividadeItem.tipo_atividade_id,
              },
              select: { 
                id: true,
                regra_franquia_id: true,
                tipo_atividade_id: true
              }
            });
          } 
          else {
            await trx2.regra_franquia_tipo_atividade.create({
              data: {
                regra_franquia_id : tipoAtividadeItem.regra_franquia_id,
                tipo_atividade_id : tipoAtividadeItem.tipo_atividade_id,
              },
              select: {
                id: true,
                regra_franquia_id: true,
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
          await trx2.regra_franquia_tipo_chamado.delete({
            where: { 
              id : tipoChamadoItem.id
            },
          });
        } else {
          if (tipoChamadoItem.id > 0) {
            await trx2.regra_franquia_tipo_chamado.update({
              where: { 
                id : tipoChamadoItem.id
              },
              data: {
                regra_franquia_id : tipoChamadoItem.regra_franquia_id,
                tipo_chamado_id : tipoChamadoItem.tipo_chamado_id,
              },
              select: { 
                id: true,
                regra_franquia_id: true,
                tipo_chamado_id: true
              }
            });
          } 
          else {
            await trx2.regra_franquia_tipo_chamado.create({
              data: {
                regra_franquia_id : tipoChamadoItem.regra_franquia_id,
                tipo_chamado_id : tipoChamadoItem.tipo_chamado_id,
              },
              select: {
                id: true,
                regra_franquia_id: true,
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

  public async delete(id: number): Promise<IContratoRegraFranquia | null> {
    let retorno : any;
    await prismaClient.$transaction(async (trx2) => {
      await trx2.regra_franquia_horario.deleteMany({
        where: { 
          regra_franquia_id : {
            equals: id
          }
        },
      });

      await trx2.regra_franquia_servico.deleteMany({
        where: { 
          regra_franquia_id : {
            equals: id
          }
        },
      });

      await trx2.regra_franquia_tipo_atividade.deleteMany({
        where: { 
          regra_franquia_id : {
            equals: id
          }
        },
      });

      await trx2.regra_franquia_tipo_chamado.deleteMany({
        where: { 
          regra_franquia_id : {
            equals: id
          }
        },
      });

      retorno =  await trx2.regra_franquia.delete({
        where: { id },
      });      
    });

    return retorno;
    // return await prismaClient.regra_franquia.delete({
    //   where: { id },
    // });
  }

}