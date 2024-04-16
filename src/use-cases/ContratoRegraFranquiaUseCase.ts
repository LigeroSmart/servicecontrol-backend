import { ContratoRegraFranquiaAlreadyExists } from '../errors/ContratoRegraFranquiaAlreadyExists';
import { ContratoRegraFranquiaNotFound } from '../errors/ContratoRegraFranquiaNotFound';
import { ContratoNotFound } from '../errors/ContratoNotFound';
import { CreateContratoRegraFranquiaDTO, IContratoRegraFranquia, UpdateContratoRegraFranquiaDTO } from '../interfaces/ContratoRegraFranquia.interface';
import { DbContratoRegraFranquiaRepository } from '../repository/DbContratoRegraFranquiaRepository';
// import { DbRegraFranquiaTipoHorarioRepository } from '../repository/DbRegraFranquiaTipoHorarioRepository';
// import { DbRegraFranquiaServicoRepository } from '../repository/DbRegraFranquiaServicoRepository';
// import { DbRegraFranquiaTipoAtividadeRepository } from '../repository/DbRegraFranquiaTipoAtividadeRepository';
// import { DbRegraFranquiaTipoChamadoRepository } from '../repository/DbRegraFranquiaTipoChamadoRepository';
import { Console } from 'console';
import { Prisma } from '@prisma/client';

export class ContratoRegraFranquiaUseCase {
  constructor(
    private contratoRegraFranquiaRepository: DbContratoRegraFranquiaRepository
    // private regraFranquiaTipoHorarioRepository: DbRegraFranquiaTipoHorarioRepository,
    // private regraFranquiaServicoRepository: DbRegraFranquiaServicoRepository,
    // private regraFranquiaTipoAtividadeRepository: DbRegraFranquiaTipoAtividadeRepository,
    // private regraFranquiaTipoChamadoRepository: DbRegraFranquiaTipoChamadoRepository
) {
    
    this.contratoRegraFranquiaRepository = contratoRegraFranquiaRepository;
    // this.regraFranquiaTipoHorarioRepository = regraFranquiaTipoHorarioRepository;
    // this.regraFranquiaServicoRepository = regraFranquiaServicoRepository;
    // this.regraFranquiaTipoAtividadeRepository = regraFranquiaTipoAtividadeRepository;
    // this.regraFranquiaTipoChamadoRepository = regraFranquiaTipoChamadoRepository;
  }

  public async createContratoRegraFranquia(
    data: CreateContratoRegraFranquiaDTO,
    horario: [],
    servico: [],
    tipo_atividade: [],
    tipo_chamado: []
  ): Promise<IContratoRegraFranquia | null> {

    // const existsContratoRegraFranquiaByDescricao = await this.ContratoRegraFranquiaRepository.getByUK(
    //   descricao
    // );

    // if (existsContratoRegraFranquiaByDescricao) {
    //   throw new ContratoRegraFranquiaAlreadyExists();
    // }

    const contratoRegraFranquiaIncluir = await this.contratoRegraFranquiaRepository.createContratoRegraFranquia(
      {
        contrato_id: data.contrato_id,
        qtd_horas: data.qtd_horas,
        valor_hora: data.valor_hora,
        qtd_meses: data.qtd_meses,
        franquia_fixa: data.franquia_fixa
      },
      horario,
      servico,
      tipo_atividade,
      tipo_chamado
    );

    let idContratoRegraFranquia : number = contratoRegraFranquiaIncluir.id;

    // #region Ocultar
    // //--> Inclusão de horários
    // horario.forEach(async horarioItem => {
    //   let _tipoHorarioId : number = horarioItem.tipo_horario_id;

    //   let contratoRegraFranquia = await this.regraFranquiaTipoHorarioRepository.createRegraFranquiaTipoHorario({
    //       regra_Franquia_id: idContratoRegraFranquia,
    //       tipo_horario_id: _tipoHorarioId          
    //     });
    // })
    // //Inclusão de horários  <--


    // //--> Inclusão de servicos
    // servico.forEach(async servicoItem => {
    //   let _servicoClienteId : number = servicoItem.servico_cliente_id;

    //   let regraFranquiaServico = await this.regraFranquiaServicoRepository.createRegraFranquiaServico({
    //       regra_Franquia_id: idContratoRegraFranquia,
    //       servico_cliente_id: _servicoClienteId
    //     });
    // })
    // //Inclusão de serviços  <-- 
    
    // //--> Inclusão de tipo de atividade
    // tipo_atividade.forEach(async tipoAtividadeItem => {
    //   let _tipoAtividadeId : number = tipoAtividadeItem.tipo_atividade_id;

    //   let regraFranquiaTipoAtividade = await this.regraFranquiaTipoAtividadeRepository.createRegraFranquiaTipoAtividade({
    //       regra_Franquia_id: idContratoRegraFranquia,
    //       tipo_atividade_id: _tipoAtividadeId
    //     });
    // })
    // //Inclusão de tipo de atividade  <-- 


    // //--> Inclusão de tipo de chamado
    // tipo_chamado.forEach(async tipoChamadoItem => {
    //   let _tipoChamadoId : number = tipoChamadoItem.tipo_chamado_id;

    //   let regraFranquiaTipoChamado = await this.regraFranquiaTipoChamadoRepository.createRegraFranquiaTipoChamado({
    //       regra_Franquia_id: idContratoRegraFranquia,
    //       tipo_chamado_id: _tipoChamadoId
    //     });
    // })
    // //Inclusão de tipo de chamado  <--     
    // #endregion
    
    return contratoRegraFranquiaIncluir;
  }

  public async getAll(contrato_id: number): Promise<IContratoRegraFranquia[] | null> {
    const contratoRegraFranquia = await this.contratoRegraFranquiaRepository.getAll(contrato_id);

    if (!contratoRegraFranquia || contratoRegraFranquia.length === 0) {
      throw new ContratoRegraFranquiaNotFound();
    }

    return contratoRegraFranquia;
  }

  
  public async getById(id: number): Promise<IContratoRegraFranquia | null> {
    const contratoRegraFranquia = await this.contratoRegraFranquiaRepository.getById(id);

    if (!contratoRegraFranquia) {
      throw new ContratoRegraFranquiaNotFound();
    }

    return contratoRegraFranquia;
  }

  public async update(
    id: number, 
    data: UpdateContratoRegraFranquiaDTO,
    horario: [],
    servico: [],
    tipo_atividade: [],
    tipo_chamado: []
    ): Promise<IContratoRegraFranquia | null> {
    
    const existsContratoRegraFranquia = await this.getById(id);

    if (!existsContratoRegraFranquia) {
      throw new ContratoRegraFranquiaNotFound();
    }
   
    const contratoRegraFranquia = await this.contratoRegraFranquiaRepository.update(
      id, 
      {
        contrato_id: data.contrato_id,
        qtd_horas: data.qtd_horas,
        valor_hora: data.valor_hora,
        qtd_meses: data.qtd_meses,
        franquia_fixa: data.franquia_fixa
      },
      horario,
      servico,
      tipo_atividade,
      tipo_chamado
  );

// #region ocultar
    // //--> CRUD horário    
    // for (let i=0; i < horario.length; i++) {
    //   let horarioItem : any = horario[i];

    //   if (horarioItem.deleted) {
    //     const ContratoRegraFranquia = await this.regraFranquiaTipoHorarioRepository.delete(horarioItem.id);

    //   } else {
    //     if (horarioItem.id > 0) {
    //       let regraFranquiaTipoHorario = await this.regraFranquiaTipoHorarioRepository.update(
    //         horarioItem.id, 
    //         trx,
    //         {
    //           regra_Franquia_id: horarioItem.regra_Franquia_id,
    //           tipo_horario_id: horarioItem.tipo_horario_id,
    //         });
    //     } 
    //     else {
    //       let regraFranquiaTipoHorario = await this.regraFranquiaTipoHorarioRepository.createRegraFranquiaTipoHorario({
    //         regra_Franquia_id: id,
    //         tipo_horario_id: horarioItem.tipo_horario_id,
    //       });
    //      }  
    //   }
    // };
    // //CRUD horário <--


    // //--> CRUD serviço
    // servico.forEach(async servicoItem => {

    //   if (servicoItem.deleted) {
    //     const ContratoRegraFranquia = await this.regraFranquiaServicoRepository.delete(servicoItem.id);

    //   } else {
    //     if (servicoItem.id > 0) {
    //       let regraFranquiaTipoHorario = await this.regraFranquiaServicoRepository.update(servicoItem.id, {
    //         regra_Franquia_id: servicoItem.regra_Franquia_id,
    //         servico_cliente_id: servicoItem.servico_cliente_id,
    //       });
    //     } 
    //     else {
    //       let regraFranquiaTipoHorario = await this.regraFranquiaServicoRepository.createRegraFranquiaServico({
    //         regra_Franquia_id: id,
    //         servico_cliente_id: servicoItem.servico_cliente_id,
    //       });
    //      }  
    //   }
    // });
    // //CRUD serviço <--

    // //--> CRUD tipo de atividade
    // tipo_atividade.forEach(async tipoAtividadeItem => {

    //   if (tipoAtividadeItem.deleted) {
    //     const ContratoRegraFranquiaTipoAtividade = await this.regraFranquiaTipoAtividadeRepository.delete(tipoAtividadeItem.id);

    //   } else {
    //     if (tipoAtividadeItem.id > 0) {
    //       let ContratoRegraFranquiaTipoAtividade = await this.regraFranquiaTipoAtividadeRepository.update(tipoAtividadeItem.id, {
    //         regra_Franquia_id: tipoAtividadeItem.regra_Franquia_id,
    //         tipo_atividade_id: tipoAtividadeItem.tipo_atividade_id,
    //       });
    //     } 
    //     else {
    //       let ContratoRegraFranquiaTipoAtividade = await this.regraFranquiaTipoAtividadeRepository.createRegraFranquiaTipoAtividade({
    //         regra_Franquia_id: id,
    //         tipo_atividade_id: tipoAtividadeItem.tipo_atividade_id,
    //       });
    //      }  
    //   }
    // });
    // //CRUD tipo de atividade <--


    // //--> CRUD tipo de chamado
    // tipo_chamado.forEach(async tipoChamadoItem => {

    //   if (tipoChamadoItem.deleted) {
    //     const ContratoRegraFranquiaTipoChamado = await this.regraFranquiaTipoChamadoRepository.delete(tipoChamadoItem.id);

    //   } else {
    //     if (tipoChamadoItem.id > 0) {
    //       let ContratoRegraFranquiaTipoChamado = await this.regraFranquiaTipoChamadoRepository.update(tipoChamadoItem.id, {
    //         regra_Franquia_id: tipoChamadoItem.regra_Franquia_id,
    //         tipo_chamado_id: tipoChamadoItem.tipo_chamado_id,
    //       });
    //     } 
    //     else {
    //       let ContratoRegraFranquiaTipoChamado = await this.regraFranquiaTipoChamadoRepository.createRegraFranquiaTipoChamado({
    //         regra_Franquia_id: id,
    //         tipo_chamado_id: tipoChamadoItem.tipo_chamado_id,
    //       });
    //      }  
    //   }
    // });
    // //CRUD tipo de chamado <--
// #endregion

    return contratoRegraFranquia;
  }

  public async delete(id: number): Promise<IContratoRegraFranquia | null> {
    const existsContratoRegraFranquia = await this.getById(id);

    if (!existsContratoRegraFranquia) {
      throw new ContratoRegraFranquiaNotFound();
    }

    
    // const regraFranquiaTipoChamado = await this.regraFranquiaTipoChamadoRepository.deleteContratoFranquia(id);

    // const regraFranquiaTipoAtividade = await this.regraFranquiaTipoAtividadeRepository.deleteContratoFranquia(id);

    // const regraFranquiaServico = await this.regraFranquiaServicoRepository.deleteContratoFranquia(id);

    // const regraFranquiaTipoHorario = await this.regraFranquiaTipoHorarioRepository.deleteContratoFranquia(id);

    const contratoRegraFranquia = await this.contratoRegraFranquiaRepository.delete(id);
    // *** AJUSTAR: A partir do repositorio apagar as dependencias ***

    return contratoRegraFranquia;

  }
  
}
