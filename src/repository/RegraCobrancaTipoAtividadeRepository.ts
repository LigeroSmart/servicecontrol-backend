import { IRegraCobrancaTipoAtividade } from '../interfaces/RegraCobrancaTipoAtividade.interface';

export interface RegraCobrancaTipoAtividadeRepository {
  createRegraCobrancaTipoAtividade(data: IRegraCobrancaTipoAtividade): Promise<IRegraCobrancaTipoAtividade | null>;
  getAll(contrato_cobranca_id: number): Promise<IRegraCobrancaTipoAtividade[] | null>;
  getById(id: number): Promise<IRegraCobrancaTipoAtividade | null>;
  update(id: number, data: IRegraCobrancaTipoAtividade): Promise<IRegraCobrancaTipoAtividade | null>;
  delete(id: number): Promise<IRegraCobrancaTipoAtividade | null>;
  deleteContratoCobranca(regra_cobranca_id: number): Promise<IRegraCobrancaTipoAtividade | null>;
}