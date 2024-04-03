import { IRegraCobrancaServico } from '../interfaces/RegraCobrancaServico.interface';

export interface RegraCobrancaServicoRepository {
  createRegraCobrancaServico(data: IRegraCobrancaServico): Promise<IRegraCobrancaServico | null>;
  getAll(contrato_cobranca_id: number): Promise<IRegraCobrancaServico[] | null>;
  getById(id: number): Promise<IRegraCobrancaServico | null>;
  update(id: number, data: IRegraCobrancaServico): Promise<IRegraCobrancaServico | null>;
  delete(id: number): Promise<IRegraCobrancaServico | null>;
  deleteContratoCobranca(regra_cobranca_id: number): Promise<IRegraCobrancaServico | null>;
}