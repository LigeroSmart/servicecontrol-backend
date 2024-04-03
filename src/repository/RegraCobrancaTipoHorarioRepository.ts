import { IRegraCobrancaTipoHorario } from '../interfaces/RegraCobrancaTipoHorario.interface';

export interface RegraCobrancaTipoHorarioRepository {
  createRegraCobrancaTipoHorario(data: IRegraCobrancaTipoHorario): Promise<IRegraCobrancaTipoHorario | null>;
  getAll(contrato_cobranca_id: number): Promise<IRegraCobrancaTipoHorario[] | null>;
  getById(id: number): Promise<IRegraCobrancaTipoHorario | null>;
  update(id: number, trx : any, data: IRegraCobrancaTipoHorario): Promise<IRegraCobrancaTipoHorario | null>;
  delete(id: number): Promise<IRegraCobrancaTipoHorario | null>;
  deleteContratoCobranca(regra_cobranca_id: number): Promise<IRegraCobrancaTipoHorario | null>;
}