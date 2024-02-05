import { CreateContatoDTO, IContato } from '../interfaces/Contato.interface';

export interface ContatoRepository {
  createContato(data: CreateContatoDTO): Promise<IContato | null>;
  getAll(): Promise<IContato[] | null>;
  getById(id: number): Promise<IContato | null>;
  getByCodigo(codigo: string): Promise<IContato | null>;
  update(id: number, data: IContato): Promise<IContato | null>;
  delete(id: number): Promise<IContato | null>;
}