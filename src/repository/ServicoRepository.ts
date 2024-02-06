import { IServico } from '../interfaces/Servico.interface';

export interface ServicoRepository {
  createServico(data: IServico): Promise<IServico | null>;
  getAll(): Promise<IServico[] | null>;
  getServicoId(id: number): Promise<IServico[] | null>;
  getById(id: number): Promise<IServico | null>;
  getByUK(descricao: string): Promise<IServico | null>;
  getByDescricao(descricao: string): Promise<IServico | null>;
  update(id: number, data: IServico): Promise<IServico | null>;
  delete(id: number): Promise<IServico | null>;
}