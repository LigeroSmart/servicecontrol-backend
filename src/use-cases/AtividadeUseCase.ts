import { ModeloHorario } from '../entities/ModeloHorario';
import { ModeloHorarioAlreadyExists } from '../errors/ModeloHorarioAlreadyExists';
import { AtividadeAlreadyExists } from '../errors/AtividadeAlreadyExists';
import { AtividadeNotFound } from '../errors/AtividadeNotFound';
import { CreateAtividadeDTO, IAtividade, UpdateAtividadeDTO } from '../interfaces/Atividade.interface';
import { DbAtividadeRepository } from '../repository/DbAtividadeRepository';
import { DbModeloHorarioRepository } from '../repository/DbModeloHorarioRepository';
import { Console, time } from 'console';

export class AtividadeUseCase {
  constructor(
    private AtividadeRepository: DbAtividadeRepository) 
  {
    AtividadeRepository = AtividadeRepository;
  }

  public async createAtividade(
    ticket: string,
    data: CreateAtividadeDTO
  ): Promise<IAtividade | null> {

    const existsAtividade = await this.AtividadeRepository.getByUK(
      ticket
    );

    if (existsAtividade) {
      throw new AtividadeAlreadyExists();
    }
    
    let sInicio = (data.data_inicio + 'T' + data.hora_inicio);
    let sFinal = (data.data_final + 'T' + data.hora_final);

    const _dataInicio = new Date(sInicio);
    const _dataFinal = new Date(sFinal);


    const atividade = await this.AtividadeRepository.createAtividade({
        usuario_id : data.usuario_id,
        tipo_horario_id : data.tipo_horario_id,
        tipo_atividade_id : data.tipo_atividade_id,
        ticket : data.ticket,
        codigo : data.codigo,
        data_inicio : _dataInicio,
        hora_inicio : _dataInicio,
        data_final : _dataFinal,
        hora_final : _dataFinal,
        assunto : data.assunto,
        descricao : data.descricao    
    });

    return atividade;
  }

  public async getAll(): Promise<IAtividade[] | null> {
    const atividade = await this.AtividadeRepository.getAll();

    return atividade;
  }

  public async getById(id: number): Promise<IAtividade | null> {
    const atividade = await this.AtividadeRepository.getById(id);

    if (!atividade) {
      throw new AtividadeNotFound();
    }

    return atividade;
  }

  public async getByTicket(ticket: string): Promise<IAtividade | null> {
    const atividade = await this.AtividadeRepository.getByTicket(ticket);

    if (!atividade) {
      throw new AtividadeNotFound();
    }

    return atividade;
  }

  public async update(
    id: number, 
    data: UpdateAtividadeDTO
    ): Promise<IAtividade | null> {
    //const existsAtividade = await this.getById(id);
    const existsAtividade = await this.AtividadeRepository.getById(id);

    if (!existsAtividade) {
      throw new AtividadeNotFound();
    }

    let sInicio = (data.data_inicio + 'T' + data.hora_inicio);
    let sFinal = (data.data_final + 'T' + data.hora_final);

    const _dataInicio = new Date(sInicio);
    const _dataFinal = new Date(sFinal);    

    const atividade = await this.AtividadeRepository.update(id, {
        usuario_id : data.usuario_id,
        tipo_horario_id : data.tipo_horario_id,
        tipo_atividade_id : data.tipo_atividade_id,
        ticket : data.ticket,
        codigo : data.codigo,
        data_inicio : _dataInicio,
        hora_inicio : _dataInicio,
        data_final : _dataFinal,
        hora_final : _dataFinal,
        assunto : data.assunto,
        descricao : data.descricao
    });

    return atividade;
  }

  public async delete(id: number): Promise<IAtividade | null> {
    const existsAtividade = await this.getById(id);

    if (!existsAtividade) {
      throw new AtividadeNotFound();
    }

    const atividade = await this.AtividadeRepository.delete(id);

    return atividade;
  }
  
}
