import { CreateTipoChamadoDTO, ITipoChamado } from '../interfaces/TipoChamado.interface';

export interface TipoChamadoRepository {
  createTipoChamado(data: CreateTipoChamadoDTO): Promise<ITipoChamado | null>;
  getAll(): Promise<ITipoChamado[] | null>;
  getById(id: number): Promise<ITipoChamado | null>;
  update(id: number, data: ITipoChamado): Promise<ITipoChamado | null>;
  delete(id: number): Promise<ITipoChamado | null>;
}