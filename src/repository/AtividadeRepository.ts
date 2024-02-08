import { CreateAtividadeDTO, IAtividade } from '../interfaces/Atividade.interface';

export interface AtividadeRepository {
  createAtividade(data: CreateAtividadeDTO): Promise<IAtividade | null>;
  getAll(): Promise<IAtividade[] | null>;
  getById(id: number): Promise<IAtividade | null>;
  getByUK(ticket: string): Promise<IAtividade | null>;
  getByTicket(ticket: string): Promise<IAtividade | null>;
  update(id: number, data: IAtividade): Promise<IAtividade | null>;
  delete(id: number): Promise<IAtividade | null>;
}