import { ContratoRegraCobrancaAlreadyExists } from '../errors/ContratoRegraCobrancaAlreadyExists';
import { ContratoRegraCobrancaNotFound } from '../errors/ContratoRegraCobrancaNotFound';
import { ContratoNotFound } from '../errors/ContratoNotFound';
import { CreateContratoRegraCobrancaDTO, IContratoRegraCobranca, UpdateContratoRegraCobrancaDTO } from '../interfaces/ContratoRegraCobranca.interface';
import { DbContratoRegraCobrancaRepository } from '../repository/DbContratoRegraCobrancaRepository';
import { DbRegraCobrancaTipoHorarioRepository } from '../repository/DbRegraCobrancaTipoHorarioRepository';
import { DbRegraCobrancaServicoRepository } from '../repository/DbRegraCobrancaServicoRepository';
import { DbRegraCobrancaTipoAtividadeRepository } from '../repository/DbRegraCobrancaTipoAtividadeRepository';
import { DbRegraCobrancaTipoChamadoRepository } from '../repository/DbRegraCobrancaTipoChamadoRepository';
import { Console } from 'console';
import { Prisma } from '@prisma/client';

export class ContratoRegraCobrancaUseCase {
  constructor(
    private contratoRegraCobrancaRepository: DbContratoRegraCobrancaRepository,
    private regraCobrancaTipoHorarioRepository: DbRegraCobrancaTipoHorarioRepository,
    private regraCobrancaServicoRepository: DbRegraCobrancaServicoRepository,
    private regraCobrancaTipoAtividadeRepository: DbRegraCobrancaTipoAtividadeRepository,
    private regraCobrancaTipoChamadoRepository: DbRegraCobrancaTipoChamadoRepository
) {
    
    this.contratoRegraCobrancaRepository = contratoRegraCobrancaRepository;
    this.regraCobrancaTipoHorarioRepository = regraCobrancaTipoHorarioRepository;
    this.regraCobrancaServicoRepository = regraCobrancaServicoRepository;
    this.regraCobrancaTipoAtividadeRepository = regraCobrancaTipoAtividadeRepository;
    this.regraCobrancaTipoChamadoRepository = regraCobrancaTipoChamadoRepository;
  }

  public async createContratoRegraCobranca(
    data: CreateContratoRegraCobrancaDTO,
    horario: [],
    servico: [],
    tipo_atividade: [],
    tipo_chamado: []
  ): Promise<IContratoRegraCobranca | null> {

    // const existsContratoRegraCobrancaByDescricao = await this.ContratoRegraCobrancaRepository.getByUK(
    //   descricao
    // );

    // if (existsContratoRegraCobrancaByDescricao) {
    //   throw new ContratoRegraCobrancaAlreadyExists();
    // }

    const trx = await this.contratoRegraCobrancaRepository.getTransacao();

    const contratoRegraCobrancaIncluir = await this.contratoRegraCobrancaRepository.createContratoRegraCobranca(
      trx, 
      {
        contrato_id: data.contrato_id,
        ordem: data.ordem,
        nome: data.nome,
        valor: data.valor,
        bloqueado: data.bloqueado
      },
      horario,
      servico,
      tipo_atividade,
      tipo_chamado
    );

    let idContratoRegraCobranca : number = contratoRegraCobrancaIncluir.id;

    // #region Ocultar
    // //--> Inclusão de horários
    // horario.forEach(async horarioItem => {
    //   let _tipoHorarioId : number = horarioItem.tipo_horario_id;

    //   let contratoRegraCobranca = await this.regraCobrancaTipoHorarioRepository.createRegraCobrancaTipoHorario({
    //       regra_cobranca_id: idContratoRegraCobranca,
    //       tipo_horario_id: _tipoHorarioId          
    //     });
    // })
    // //Inclusão de horários  <--


    // //--> Inclusão de servicos
    // servico.forEach(async servicoItem => {
    //   let _servicoClienteId : number = servicoItem.servico_cliente_id;

    //   let regraCobrancaServico = await this.regraCobrancaServicoRepository.createRegraCobrancaServico({
    //       regra_cobranca_id: idContratoRegraCobranca,
    //       servico_cliente_id: _servicoClienteId
    //     });
    // })
    // //Inclusão de serviços  <-- 
    
    // //--> Inclusão de tipo de atividade
    // tipo_atividade.forEach(async tipoAtividadeItem => {
    //   let _tipoAtividadeId : number = tipoAtividadeItem.tipo_atividade_id;

    //   let regraCobrancaTipoAtividade = await this.regraCobrancaTipoAtividadeRepository.createRegraCobrancaTipoAtividade({
    //       regra_cobranca_id: idContratoRegraCobranca,
    //       tipo_atividade_id: _tipoAtividadeId
    //     });
    // })
    // //Inclusão de tipo de atividade  <-- 


    // //--> Inclusão de tipo de chamado
    // tipo_chamado.forEach(async tipoChamadoItem => {
    //   let _tipoChamadoId : number = tipoChamadoItem.tipo_chamado_id;

    //   let regraCobrancaTipoChamado = await this.regraCobrancaTipoChamadoRepository.createRegraCobrancaTipoChamado({
    //       regra_cobranca_id: idContratoRegraCobranca,
    //       tipo_chamado_id: _tipoChamadoId
    //     });
    // })
    // //Inclusão de tipo de chamado  <--     
    // #endregion
    
    return contratoRegraCobrancaIncluir;
  }

  public async getAll(contrato_id: number): Promise<IContratoRegraCobranca[] | null> {
    const contratoRegraCobranca = await this.contratoRegraCobrancaRepository.getAll(contrato_id);

    // if (!contratoRegraCobranca || contratoRegraCobranca.length === 0) {
    //   throw new ContratoRegraCobrancaNotFound();
    // }

    return contratoRegraCobranca;
  }

  
  public async getById(id: number): Promise<IContratoRegraCobranca | null> {
    const contratoRegraCobranca = await this.contratoRegraCobrancaRepository.getById(id);

    if (!contratoRegraCobranca) {
      throw new ContratoRegraCobrancaNotFound();
    }

    return contratoRegraCobranca;
  }

  public async update(
    id: number, 
    data: UpdateContratoRegraCobrancaDTO,
    horario: [],
    servico: [],
    tipo_atividade: [],
    tipo_chamado: []
    ): Promise<IContratoRegraCobranca | null> {
    
    const existsContratoRegraCobranca = await this.getById(id);

    if (!existsContratoRegraCobranca) {
      throw new ContratoRegraCobrancaNotFound();
    }
   
    const trx = this.contratoRegraCobrancaRepository.getTransacao();

    const contratoRegraCobranca = await this.contratoRegraCobrancaRepository.update(
      id, 
      trx,
      {
        contrato_id: data.contrato_id,
        ordem: data.ordem,
        nome: data.nome,
        valor: data.valor,
        bloqueado: data.bloqueado
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
    //     const ContratoRegraCobranca = await this.regraCobrancaTipoHorarioRepository.delete(horarioItem.id);

    //   } else {
    //     if (horarioItem.id > 0) {
    //       let regraCobrancaTipoHorario = await this.regraCobrancaTipoHorarioRepository.update(
    //         horarioItem.id, 
    //         trx,
    //         {
    //           regra_cobranca_id: horarioItem.regra_cobranca_id,
    //           tipo_horario_id: horarioItem.tipo_horario_id,
    //         });
    //     } 
    //     else {
    //       let regraCobrancaTipoHorario = await this.regraCobrancaTipoHorarioRepository.createRegraCobrancaTipoHorario({
    //         regra_cobranca_id: id,
    //         tipo_horario_id: horarioItem.tipo_horario_id,
    //       });
    //      }  
    //   }
    // };
    // //CRUD horário <--


    // //--> CRUD serviço
    // servico.forEach(async servicoItem => {

    //   if (servicoItem.deleted) {
    //     const ContratoRegraCobranca = await this.regraCobrancaServicoRepository.delete(servicoItem.id);

    //   } else {
    //     if (servicoItem.id > 0) {
    //       let regraCobrancaTipoHorario = await this.regraCobrancaServicoRepository.update(servicoItem.id, {
    //         regra_cobranca_id: servicoItem.regra_cobranca_id,
    //         servico_cliente_id: servicoItem.servico_cliente_id,
    //       });
    //     } 
    //     else {
    //       let regraCobrancaTipoHorario = await this.regraCobrancaServicoRepository.createRegraCobrancaServico({
    //         regra_cobranca_id: id,
    //         servico_cliente_id: servicoItem.servico_cliente_id,
    //       });
    //      }  
    //   }
    // });
    // //CRUD serviço <--

    // //--> CRUD tipo de atividade
    // tipo_atividade.forEach(async tipoAtividadeItem => {

    //   if (tipoAtividadeItem.deleted) {
    //     const ContratoRegraCobrancaTipoAtividade = await this.regraCobrancaTipoAtividadeRepository.delete(tipoAtividadeItem.id);

    //   } else {
    //     if (tipoAtividadeItem.id > 0) {
    //       let ContratoRegraCobrancaTipoAtividade = await this.regraCobrancaTipoAtividadeRepository.update(tipoAtividadeItem.id, {
    //         regra_cobranca_id: tipoAtividadeItem.regra_cobranca_id,
    //         tipo_atividade_id: tipoAtividadeItem.tipo_atividade_id,
    //       });
    //     } 
    //     else {
    //       let ContratoRegraCobrancaTipoAtividade = await this.regraCobrancaTipoAtividadeRepository.createRegraCobrancaTipoAtividade({
    //         regra_cobranca_id: id,
    //         tipo_atividade_id: tipoAtividadeItem.tipo_atividade_id,
    //       });
    //      }  
    //   }
    // });
    // //CRUD tipo de atividade <--


    // //--> CRUD tipo de chamado
    // tipo_chamado.forEach(async tipoChamadoItem => {

    //   if (tipoChamadoItem.deleted) {
    //     const ContratoRegraCobrancaTipoChamado = await this.regraCobrancaTipoChamadoRepository.delete(tipoChamadoItem.id);

    //   } else {
    //     if (tipoChamadoItem.id > 0) {
    //       let ContratoRegraCobrancaTipoChamado = await this.regraCobrancaTipoChamadoRepository.update(tipoChamadoItem.id, {
    //         regra_cobranca_id: tipoChamadoItem.regra_cobranca_id,
    //         tipo_chamado_id: tipoChamadoItem.tipo_chamado_id,
    //       });
    //     } 
    //     else {
    //       let ContratoRegraCobrancaTipoChamado = await this.regraCobrancaTipoChamadoRepository.createRegraCobrancaTipoChamado({
    //         regra_cobranca_id: id,
    //         tipo_chamado_id: tipoChamadoItem.tipo_chamado_id,
    //       });
    //      }  
    //   }
    // });
    // //CRUD tipo de chamado <--
// #endregion

    return contratoRegraCobranca;
  }

  public async delete(id: number): Promise<IContratoRegraCobranca | null> {
    const existsContratoRegraCobranca = await this.getById(id);

    if (!existsContratoRegraCobranca) {
      throw new ContratoRegraCobrancaNotFound();
    }

    
    const regraCobrancaTipoChamado = await this.regraCobrancaTipoChamadoRepository.deleteContratoCobranca(id);

    const regraCobrancaTipoAtividade = await this.regraCobrancaTipoAtividadeRepository.deleteContratoCobranca(id);

    const regraCobrancaServico = await this.regraCobrancaServicoRepository.deleteContratoCobranca(id);

    const regraCobrancaTipoHorario = await this.regraCobrancaTipoHorarioRepository.deleteContratoCobranca(id);

    const contratoRegraCobranca = await this.contratoRegraCobrancaRepository.delete(id);

    return contratoRegraCobranca;

  }
  
}
