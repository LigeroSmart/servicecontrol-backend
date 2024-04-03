import { IRegraCobrancaTipoChamado } from '../interfaces/RegraCobrancaTipoChamado.interface';

export interface RegraCobrancaTipoChamadoRepository {
  createRegraCobrancaTipoChamado(data: IRegraCobrancaTipoChamado): Promise<IRegraCobrancaTipoChamado | null>;
  getAll(contrato_cobranca_id: number): Promise<IRegraCobrancaTipoChamado[] | null>;
  getById(id: number): Promise<IRegraCobrancaTipoChamado | null>;
  update(id: number, data: IRegraCobrancaTipoChamado): Promise<IRegraCobrancaTipoChamado | null>;
  delete(id: number): Promise<IRegraCobrancaTipoChamado | null>;
  deleteContratoCobranca(regra_cobranca_id: number): Promise<IRegraCobrancaTipoChamado | null>;
}