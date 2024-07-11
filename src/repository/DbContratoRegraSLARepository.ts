import { CreateContratoRegraSlaDTO, IContratoRegraSla, UpdateContratoRegraSlaDTO } from '../interfaces/ContratoRegraSLA.interface';
import { prismaClient } from '../database/prisma';
import { Prisma, PrismaClient } from '@prisma/client';
import { ContratoRegraSla } from '../entities/ContratoRegraSLA';
import { ContratoRegraSlaRepository } from './ContratoRegraSLARepository';
import { equal } from 'assert';

//import { CreateRegraSlaTipoHorarioDTO, IRegraSlaTipoHorario, UpdateRegraSlaTipoHorarioDTO } from '../interfaces/RegraSlaTipoHorario.interface';

export class DbContratoRegraSLARepository implements ContratoRegraSlaRepository {
  
  public async createContratoRegraSLA(
    data: CreateContratoRegraSlaDTO,
    contato: [],
    servico: [],
    sla: []
  ): Promise<IContratoRegraSla> {

    let contratoRegraSla : any;

    await prismaClient.$transaction(async (trx2) => {
      const _id = data.contrato_id; // contratoRegraSla.id;

      // #region CRUD contato    
      for (let i=0; i < contato.length; i++) {
        let horarioItem : any = contato[i];

        await trx2.regra_sla_contato.create({
          data: {
            contrato_id : _id,
            contato_id : horarioItem.contato_id,
          },
          select: {
            id: true,
            contrato_id: true,
            contato_id: true
          },
        });
      };
      // #endregion 
      
      // #region CRUD serviço
      for (let i=0; i < servico.length; i++) {
        let servicoItem : any = servico[i];

        await trx2.regra_sla_servico.create({
          data: {
            contrato_id : _id,
            servico_cliente_id : servicoItem.servico_cliente_id,
          },
          select: {
            id: true,
            contrato_id: true,
            servico_cliente_id: true
          },
        });
      };
      // #endregion      
      
      // #region CRUD SLA
      for (let i = 0; i < sla.length; i++) {
        let slaItem : any = sla[i];
 
        await trx2.regra_sla_sla.create({
          data: {
            contrato_id : _id,
            sla_id : slaItem.sla_id,
          },
          select: {
            id: true,
            contrato_id: true,
            sla_id: true
          },
        });
      };
      // #endregion

      contratoRegraSla = this.getAll(data.contrato_id);
    });

    return contratoRegraSla;
  }

  public async getAll(contrato_id: number): Promise<IContratoRegraSla[] | null> {
    /** CÓDIGO ORIGINAL */
    //return await prismaClient.$queryRaw`select p.id, P.descricao, p.situacao, m.descricao menu, m.rota, m.ordem, m.grupo_id, m.id menu_id from perfil p left outer join perfil_menu pm on p.id = pm.perfil_id left outer join menu m on pm.menu_id = m.id where p.id = ${id} order by m.ordem`;
    return await prismaClient.$queryRaw`select contrato.id as contrato_id, (select string_agg(contato.nome, ', ') from regra_sla_contato c left outer join contato on c.contato_id = contato.id where c.contrato_id = contrato.id) as  nome_contato, (select string_agg(servico.descricao, ', ') from regra_sla_servico serv left outer join servico_cliente on servico_cliente.id = serv.servico_cliente_id left outer join servico on servico.id = servico_cliente.servico_id where serv.contrato_id = contrato.id) as descricao_servico, (select string_agg(sla.descricao, ', ') from regra_sla_sla s left outer join sla ON s.sla_id = sla.id where s.contrato_id = contrato.id) as descricao_sla from contrato where contrato.id = ${contrato_id}`;

    // return await prismaClient.$queryRaw`select contrato.id as contrato_id, ` +

    //  `(select string_agg(contato.nome, ', ') ` +
    //  `from regra_sla_contato c ` +
    //  `left outer join contato on c.contato_id = contato.id ` +
    //  `where c.contrato_id = contrato.id) as  nome_contato, ` +

    //  `(select string_agg(servico.descricao, ', ') ` +
    //  `from regra_sla_servico serv ` +
    //  `left outer join servico_cliente on servico_cliente.id = serv.servico_cliente_id `+
    //  `left outer join servico on servico.id = servico_cliente.servico_id ` +
    //  `where serv.contrato_id = contrato.id) as descricao_servico, ` +

    //  `(select string_agg(sla.descricao, ', ') ` +
    //  `from regra_sla_sla s ` + 
    //  `left outer join sla ON s.sla_id = sla.id ` +
    //  `where s.contrato_id = contrato.id) as descricao_sla ` +

    //  `from contrato where contrato.id = ${contrato_id} `;    


  }

  public async getById(id: number): Promise<IContratoRegraSla | null> {
    return await prismaClient.contrato.findFirst(({            
      where: {
        id: {
          equals: id
        }
      },      
      select: {
        regra_sla_contato: {
          select: {
            id: true,
            contrato_id: true,
            contato_id: true,
            contato: {
              select: {
                nome: true
              }
            }
          }          
        },
        regra_sla_servico: {
          select: {
            id: true,
            contrato_id: true,
            servico_cliente_id: true,
            servico_cliente: {
              select: {
                servico: {
                  select: {
                    descricao: true
                  }
                }
              }
            }
          }
        },
        regra_sla_sla: {
          select: {
            id: true,
            contrato_id: true,
            sla_id: true,
            sla: {
              select: {
                descricao: true
              }
            }
          }
        }
      }      
    }));

  }

  public async update(
    contrato_id: number, 
    //data: UpdateContratoRegraSlaDTO,
    contato: [],
    servico: [],
    sla: []
  ): Promise<IContratoRegraSla | null> {

    let retorno;

    await prismaClient.$transaction(async (trx2) => {
    //   retorno = await trx2.regra_sla_contato.update({
    //     where: { id },
    //     data: data,
    //     select: { 
    //       id: true,
    //       contrato_id: true,
    //       contato_id: true
    //     }
    //   });

      // #region CRUD contato    
      for (let i=0; i<contato.length; i++) {
        let contatoItem : any = contato[i];

        if (contatoItem.deleted) {
          await trx2.regra_sla_contato.delete({
            where: { 
              id : contatoItem.id
            },
          });
        } else {
          if (contatoItem.id > 0) {
            await trx2.regra_sla_contato.update({
              where: { 
                id : contatoItem.id 
              },
              data: {
                contrato_id : contatoItem.contrato_id,
                contato_id : contatoItem.contato_id,
              },
              select: { 
                id: true,
                contrato_id: true,
                contato_id: true
              }
            });            
          } 
          else {
            await trx2.regra_sla_contato.create({
              data: {
                contrato_id : contatoItem.regra_Sla_id,
                contato_id : contatoItem.modelo_horario_id,
              },
              select: {
                id: true,
                contrato_id: true,
                contato_id: true
              },
            });
          }  
        }
      };
      // #endregion 
      
      // #region CRUD serviço
      for (let i=0; i < servico.length; i++) {
        let servicoItem : any = servico[i];

        console.log('servicoItem', servicoItem);

        if (servicoItem.deleted) {
          await trx2.regra_sla_servico.delete({
            where: { 
              id : servicoItem.id
            },
          });
        } else {
          if (servicoItem.id > 0) {
            await trx2.regra_sla_servico.update({
              where: { 
                id : servicoItem.id
              },
              data: {
                contrato_id : servicoItem.contrato_id,
                servico_cliente_id : servicoItem.servico_cliente_id,
              },
              select: { 
                id: true,
                contrato_id: true,
                servico_cliente_id: true
              }
            });
          } 
          else {
            await trx2.regra_sla_servico.create({
              data: {
                contrato_id : servicoItem.contrato_id,
                servico_cliente_id : servicoItem.servico_cliente_id,
              },
              select: {
                id: true,
                contrato_id: true,
                servico_cliente_id: true
              },
            });
          }  
        }
      };
      // #endregion      
      
      // #region CRUD sla
      for (let i = 0; i < sla.length; i++) {
        let slaItem : any = sla[i];

        if (slaItem.deleted) {
          await trx2.regra_sla_sla.delete({
            where: { 
              id : slaItem.id
            },
          });
        } else {
          if (slaItem.id > 0) {
            await trx2.regra_sla_sla.update({
              where: { 
                id : slaItem.id
              },
              data: {
                contrato_id : slaItem.regra_Sla_id,
                sla_id : slaItem.tipo_atividade_id,
              },
              select: { 
                id: true,
                contrato_id: true,
                sla_id: true
              }
            });
          } 
          else {
            await trx2.regra_sla_sla.create({
              data: {
                contrato_id : slaItem.contrato_id,
                sla_id : slaItem.sla_id,
              },
              select: {
                id: true,
                contrato_id: true,
                sla_id: true
              },
            });
          }  
        }
      };
      // #endregion
      
    });

    //return retorno;
    return this.getAll(contrato_id);
  }

  public async delete(contrato_id: number): Promise<IContratoRegraSla | null> {
    let retorno : any;
    console.log('contrato_id=',contrato_id); 
    await prismaClient.$transaction(async (trx2) => {
      await trx2.regra_sla_contato.deleteMany({
        where: { 
          contrato_id : {
            equals: contrato_id
          }
        },
      });

      await trx2.regra_sla_servico.deleteMany({
        where: { 
          contrato_id : {
            equals: contrato_id
          }
        },
      });

      await trx2.regra_sla_sla.deleteMany({
        where: { 
          contrato_id : {
            equals: contrato_id
          }
        },
      });
   
      retorno = true;
    });

    return retorno;
  }

}