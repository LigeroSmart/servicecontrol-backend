import { RegraCobrancaTipoHorarioAlreadyExists } from '../errors/RegraCobrancaTipoHorarioAlreadyExists';
import { RegraCobrancaTipoHorarioNotFound } from '../errors/RegraCobrancaTipoHorarioNotFound';
import { ContratoNotFound } from '../errors/ContratoNotFound';
import { CreateRegraCobrancaTipoHorarioDTO, IRegraCobrancaTipoHorario, UpdateRegraCobrancaTipoHorarioDTO } from '../interfaces/RegraCobrancaTipoHorario.interface';
import { DbRegraCobrancaTipoHorarioRepository } from '../repository/DbRegraCobrancaTipoHorarioRepository';
import { Console } from 'console';

export class RegraCobrancaTipoHorarioUseCase {
  constructor(
    private regraCobrancaTipoHorarioRepository: DbRegraCobrancaTipoHorarioRepository
) {
    
    this.regraCobrancaTipoHorarioRepository = regraCobrancaTipoHorarioRepository;
  }

  public async createRegraCobrancaTipoHorario(
    data: CreateRegraCobrancaTipoHorarioDTO
  ): Promise<IRegraCobrancaTipoHorario | null> {

    const regraCobrancaTipoHorarioIncluir = await this.regraCobrancaTipoHorarioRepository.createRegraCobrancaTipoHorario({
      regra_cobranca_id: data.regra_cobranca_id,
      tipo_horario_id: data.tipo_horario_id
    });


    return regraCobrancaTipoHorarioIncluir;
  }

  public async getAll(regra_cobranca_id: number): Promise<IRegraCobrancaTipoHorario[] | null> {
    const regraCobrancaTipoHorario = await this.regraCobrancaTipoHorarioRepository.getAll(regra_cobranca_id);

    // if (!RegraCobrancaTipoHorario || RegraCobrancaTipoHorario.length === 0) {
    //   throw new RegraCobrancaTipoHorarioNotFound();
    // }

    return regraCobrancaTipoHorario;
  }

  
  public async getById(id: number): Promise<IRegraCobrancaTipoHorario | null> {
    const regraCobrancaTipoHorario = await this.regraCobrancaTipoHorarioRepository.getById(id);

    if (!regraCobrancaTipoHorario) {
      throw new RegraCobrancaTipoHorarioNotFound();
    }

    return regraCobrancaTipoHorario;
  }

  public async update(
    id: number, 
    data: UpdateRegraCobrancaTipoHorarioDTO
    ): Promise<IRegraCobrancaTipoHorario | null> {
    
    const existsRegraCobrancaTipoHorario = await this.getById(id);

    // if (!existsRegraCobrancaTipoHorario) {
    //   throw new RegraCobrancaTipoHorarioNotFound();
    // }

    const regraCobrancaTipoHorario = await this.regraCobrancaTipoHorarioRepository.update(id, {
        regra_cobranca_id: data.regra_cobranca_id,
        tipo_horario_id: data.tipo_horario_id
    });

    return regraCobrancaTipoHorario;
  }

  public async delete(id: number): Promise<IRegraCobrancaTipoHorario | null> {
    const existsRegraCobrancaTipoHorario = await this.getById(id);

    if (!existsRegraCobrancaTipoHorario) {
      throw new RegraCobrancaTipoHorarioNotFound();
    }

    const regraCobrancaTipoHorario = await this.regraCobrancaTipoHorarioRepository.delete(id);

    return regraCobrancaTipoHorario;
  }
  
}
